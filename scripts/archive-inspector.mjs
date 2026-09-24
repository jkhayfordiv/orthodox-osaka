import fs from 'fs';
import path from 'path';

async function scanPage(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    
    // Check if Shift_JIS or UTF-8
    let text = '';
    try {
      text = new TextDecoder('shift_jis', { fatal: true }).decode(buf);
    } catch {
      text = new TextDecoder('utf-8').decode(buf);
    }

    const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\r?\n/g, ' ').trim() : '';

    const hrefRegex = /href=["']([^"'#>]+)["']/gi;
    const links = new Set();
    let m;
    while ((m = hrefRegex.exec(text)) !== null) {
      const link = m[1].trim();
      if (!link.startsWith('http://') && !link.startsWith('https://') && !link.startsWith('mailto:') && !link.includes('cdn-cgi')) {
        links.add(link);
      }
    }

    return {
      title,
      links: Array.from(links),
      size: buf.byteLength
    };
  } catch (err) {
    return { error: err.message };
  }
}

async function main() {
  console.log('Inspecting /george/ index...');
  const george = await scanPage('https://orthodox-jp.com/george/');
  console.log('George Title:', george.title);
  console.log('George Links count:', george.links.length);
  console.log('First 20 links in /george/:', george.links.slice(0, 20));

  console.log('\nInspecting /maria/ index...');
  const maria = await scanPage('https://orthodox-jp.com/maria/');
  console.log('Maria Title:', maria.title);
  console.log('Maria Links count:', maria.links.length);
  console.log('First 20 links in /maria/:', maria.links.slice(0, 20));

  console.log('\nInspecting /liturgy/ index...');
  const liturgy = await scanPage('https://orthodox-jp.com/liturgy/');
  console.log('Liturgy Title:', liturgy.title);
  console.log('Liturgy Links count:', liturgy.links.length);
  console.log('First 20 links in /liturgy/:', liturgy.links.slice(0, 20));
}

main();
