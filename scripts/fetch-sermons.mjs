import fs from 'fs';
import path from 'path';

function decodeHtml(html) {
  if (!html) return '';
  return html
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function stripHtml(html) {
  if (!html) return '';
  return decodeHtml(html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' '));
}

function detectLanguage(link, title, content) {
  if (link && link.includes('lang=ru')) return 'ru';
  if (link && link.includes('lang=en')) return 'en';
  if (link && link.includes('lang=ja')) return 'ja';

  const sample = (title + ' ' + (content ? content.slice(0, 300) : '')).trim();
  if (/[\u0400-\u04FF]/.test(sample)) {
    return 'ru';
  }
  if (/[\u3040-\u30ff\u4e00-\u9fff]/.test(sample)) {
    return 'ja';
  }
  return 'en';
}

async function fetchAllPosts() {
  console.log('Connecting to Osaka Orthodox Church WordPress REST API...');
  const baseUrl = 'https://orthodox-jp.com/osaka/index.php?rest_route=/wp/v2/posts';
  
  let page = 1;
  let allPosts = [];
  let totalPages = 1;

  while (page <= totalPages) {
    const url = `${baseUrl}&per_page=100&page=${page}&_embed=true`;
    console.log(`Fetching page ${page} of ${totalPages} with _embed=true...`);
    
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Error fetching page ${page}: HTTP ${res.status}`);
        break;
      }

      if (page === 1) {
        totalPages = parseInt(res.headers.get('x-wp-totalpages') || '1', 10);
        const totalItems = res.headers.get('x-wp-total') || 'unknown';
        console.log(`Total posts available on website: ${totalItems} across ${totalPages} pages.`);
      }

      const posts = await res.json();
      if (!Array.isArray(posts) || posts.length === 0) {
        break;
      }

      allPosts.push(...posts);
      page++;
    } catch (err) {
      console.error(`Failed to fetch page ${page}:`, err.message);
      break;
    }
  }

  console.log(`Successfully downloaded ${allPosts.length} posts with media from WordPress!`);

  // Transform into clean, structured sermon items
  const processedPosts = allPosts.map((post) => {
    const title = decodeHtml(post.title?.rendered || '');
    const rawContent = post.content?.rendered || '';
    const cleanContent = stripHtml(rawContent);
    const lang = detectLanguage(post.link, title, cleanContent);

    // Extract featured media (The Holy Icon)
    let featuredImageUrl = '';
    let featuredThumbnailUrl = '';
    let featuredAlt = '';

    if (post._embedded && Array.isArray(post._embedded['wp:featuredmedia']) && post._embedded['wp:featuredmedia'].length > 0) {
      const media = post._embedded['wp:featuredmedia'][0];
      featuredImageUrl = media.source_url || '';
      featuredThumbnailUrl = media.media_details?.sizes?.thumbnail?.source_url || media.media_details?.sizes?.medium?.source_url || media.source_url || '';
      featuredAlt = media.alt_text || decodeHtml(media.title?.rendered || '');
    }

    // Fallback: check if an <img> tag is inside rawContent
    if (!featuredImageUrl && rawContent) {
      const imgMatch = rawContent.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) {
        featuredImageUrl = imgMatch[1];
        featuredThumbnailUrl = imgMatch[1];
      }
    }

    // Extract excerpt
    const excerpt = decodeHtml(post.excerpt?.rendered || '').replace(/<[^>]*>?/gm, '').trim();

    return {
      id: post.id,
      slug: post.slug,
      date: post.date ? post.date.split('T')[0] : '',
      dateTime: post.date,
      link: post.link,
      language: lang,
      title: title,
      excerpt: excerpt || (cleanContent.slice(0, 160) + '...'),
      iconImage: featuredImageUrl,
      iconThumbnail: featuredThumbnailUrl,
      iconAlt: featuredAlt,
      contentHtml: rawContent,
      contentText: cleanContent,
    };
  });

  // Sort descending by date
  processedPosts.sort((a, b) => b.date.localeCompare(a.date));

  // Statistics
  const stats = {
    total: processedPosts.length,
    ja: processedPosts.filter((p) => p.language === 'ja').length,
    en: processedPosts.filter((p) => p.language === 'en').length,
    ru: processedPosts.filter((p) => p.language === 'ru').length,
    oldest: processedPosts[processedPosts.length - 1]?.date,
    newest: processedPosts[0]?.date,
  };

  console.log('\n--- Sermon Archive Breakdown ---');
  console.log(`Total: ${stats.total}`);
  console.log(`Japanese (日本語): ${stats.ja}`);
  console.log(`English: ${stats.en}`);
  console.log(`Russian (Русский): ${stats.ru}`);
  console.log(`Date Range: ${stats.oldest} to ${stats.newest}`);

  // Write to src/data/sermonsArchive.json
  const outPath = path.resolve('src', 'data', 'sermonsArchive.json');
  fs.writeFileSync(outPath, JSON.stringify(processedPosts, null, 2), 'utf-8');
  console.log(`\nSaved entire archive to ${outPath}`);
}

fetchAllPosts();
