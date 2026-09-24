import fs from 'fs';
import path from 'path';

function cleanHtml(rawHtml) {
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
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function crawlSection(sectionName, startUrls) {
  const outputDir = path.resolve(`archive/${sectionName}`);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const baseDomain = 'https://orthodox-jp.com';
  const sectionBase = `https://orthodox-jp.com/${sectionName}/`;
  
  const visited = new Set();
  const queue = [...startUrls];
  const catalog = [];

  console.log(`\n========================================`);
  console.log(`Starting crawl of /${sectionName}/...`);
  console.log(`========================================`);

  while (queue.length > 0) {
    const currentUrl = queue.shift();
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);

    try {
      const res = await fetch(currentUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.warn(`[HTTP ${res.status}] ${currentUrl}`);
        continue;
      }

      const contentType = res.headers.get('content-type') || '';
      const isHtml = contentType.includes('text/html');
      const isPdf = contentType.includes('pdf') || currentUrl.toLowerCase().endsWith('.pdf');

      // Calculate local path relative to section
      const parsedUrl = new URL(currentUrl);
      let relPath = parsedUrl.pathname.replace(new RegExp(`^/${sectionName}/?`, 'i'), '');
      if (!relPath || relPath.endsWith('/')) {
        relPath += 'index.html';
      }

      const localFilePath = path.join(outputDir, relPath);
      fs.mkdirSync(path.dirname(localFilePath), { recursive: true });

      if (isPdf) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(localFilePath, buf);
        console.log(`[PDF ${buf.length} bytes] Saved ${relPath}`);
        catalog.push({
          type: 'pdf',
          url: currentUrl,
          relativePath: relPath,
          size: buf.length
        });
        continue;
      }

      if (!isHtml) {
        // Audio or image or other asset
        continue;
      }

      const buf = await res.arrayBuffer();
      let html = '';
      try {
        html = new TextDecoder('shift_jis', { fatal: true }).decode(buf);
      } catch {
        html = new TextDecoder('utf-8').decode(buf);
      }

      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].replace(/\r?\n/g, ' ').trim() : path.basename(relPath);

      const content = cleanHtml(html);

      // Save raw HTML and clean Markdown
      fs.writeFileSync(localFilePath, Buffer.from(buf));
      const mdPath = localFilePath.replace(/\.[^/.]+$/, '.md');
      fs.writeFileSync(
        mdPath,
        `# ${title}\n\n*Original URL: ${currentUrl}*\n\n---\n\n${content}`,
        'utf8'
      );

      catalog.push({
        type: 'article',
        title,
        url: currentUrl,
        relativePath: relPath,
        markdownPath: path.relative(process.cwd(), mdPath).replace(/\\/g, '/'),
        contentLength: content.length,
        snippet: content.slice(0, 160).replace(/\n/g, ' ') + '...'
      });

      console.log(`[OK] (${visited.size}) ${title} -> ${relPath}`);

      // Extract links with proper relative URL resolution!
      const hrefRegex = /href=["']([^"'#>]+)["']/gi;
      let m;
      while ((m = hrefRegex.exec(html)) !== null) {
        const rawLink = m[1].trim();
        if (rawLink.startsWith('mailto:') || rawLink.startsWith('javascript:') || rawLink.includes('cdn-cgi')) {
          continue;
        }

        try {
          const resolved = new URL(rawLink, currentUrl);
          // Only crawl within the same section on orthodox-jp.com
          if (resolved.origin === baseDomain && resolved.pathname.toLowerCase().startsWith(`/${sectionName.toLowerCase()}/`)) {
            const cleanUrl = resolved.origin + resolved.pathname;
            if (!visited.has(cleanUrl) && !queue.includes(cleanUrl)) {
              queue.push(cleanUrl);
            }
          }
        } catch {
          // ignore malformed URLs
        }
      }
    } catch (err) {
      console.error(`Error on ${currentUrl}:`, err.message);
    }
  }

  const catalogPath = path.join(outputDir, 'catalog.json');
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`Finished /${sectionName}/! Total items: ${catalog.length}`);
  return catalog;
}

async function main() {
  await crawlSection('george', ['https://orthodox-jp.com/george/']);
  await crawlSection('maria', ['https://orthodox-jp.com/maria/']);
  await crawlSection('liturgy', ['https://orthodox-jp.com/liturgy/']);
  await crawlSection('pandane', ['https://orthodox-jp.com/pandane/']);
}

main();
