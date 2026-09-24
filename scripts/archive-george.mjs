import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://orthodox-jp.com/george/';
const OUTPUT_DIR = path.resolve('archive/george');
const DATA_DIR = path.resolve('src/data');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function cleanHtml(rawHtml) {
  // Convert basic HTML to clean markdown-like text
  return rawHtml
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi, '\n\n### $1\n\n')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]+>/g, '') // remove remaining HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function fetchPage(filename) {
  const url = BASE_URL + filename;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`Failed to fetch ${url}: HTTP ${res.status}`);
      return null;
    }

    const buf = await res.arrayBuffer();
    let html = '';
    try {
      html = new TextDecoder('shift_jis', { fatal: true }).decode(buf);
    } catch {
      html = new TextDecoder('utf-8').decode(buf);
    }

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\r?\n/g, ' ').trim() : filename;

    // Find all links to other HTML pages in /george/
    const links = new Set();
    const hrefRegex = /href=["']([^"'#>]+)["']/gi;
    let m;
    while ((m = hrefRegex.exec(html)) !== null) {
      const link = m[1].trim();
      if (!link.startsWith('http') && !link.startsWith('mailto:') && !link.includes('cdn-cgi')) {
        if (link.endsWith('.htm') || link.endsWith('.html')) {
          links.add(link);
        }
      }
    }

    const content = cleanHtml(html);

    return {
      filename,
      url,
      title,
      links: Array.from(links),
      content,
      rawHtml: html,
      size: buf.byteLength
    };
  } catch (err) {
    console.error(`Error fetching ${filename}:`, err.message);
    return null;
  }
}

async function main() {
  console.log('Starting archive crawl of Fr. George repository (/george/)...');

  const visited = new Set();
  const queue = ['seikyoukaitoha.htm', 'gospel.htm', 'questions.htm', 'farthers.htm', 'paisiindex.html', 'sanfjohnindex.htm', 'liturgy.htm', 'saints.htm', 'bookguide.htm'];
  const catalog = [];

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    console.log(`Processing [${visited.size}] ${current}...`);
    const page = await fetchPage(current);
    if (!page) continue;

    catalog.push({
      id: current.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_'),
      filename: current,
      title: page.title,
      contentLength: page.content.length,
      snippet: page.content.slice(0, 180) + '...',
      url: page.url
    });

    // Save individual markdown file for archival
    const mdPath = path.join(OUTPUT_DIR, current.replace(/\.[^/.]+$/, '') + '.md');
    fs.mkdirSync(path.dirname(mdPath), { recursive: true });
    fs.writeFileSync(mdPath, `# ${page.title}\n\n*Original source: ${page.url}*\n*Author: Fr. George Matsushima (司祭ゲオルギイ松島雄一)*\n\n---\n\n${page.content}`, 'utf8');

    // Discover new internal pages
    for (const link of page.links) {
      if (!visited.has(link) && !queue.includes(link) && !link.includes('../')) {
        queue.push(link);
      }
    }
  }

  // Save the master catalog index
  fs.writeFileSync(path.join(OUTPUT_DIR, 'catalog.json'), JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`\nSuccessfully archived ${catalog.length} articles to /archive/george/!`);
}

main();
