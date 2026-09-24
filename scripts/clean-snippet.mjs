import fs from 'fs';

export function cleanSnippet(content, title) {
  if (!content) return '';
  const lines = content.split('\n');
  const valid = [];

  for (let l of lines) {
    l = l.trim();
    if (!l || l.startsWith('#') || l.startsWith('*Original') || l.startsWith('---') || l.startsWith('![') || l.startsWith('[](')) {
      continue;
    }
    // If line has a relative link to another page like (heiannishite.htm), skip it
    if (/\([^\)]+\.html?\)/i.test(l) || /\[.*\]\(.*\.html?\)/i.test(l)) {
      continue;
    }
    // Remove navigation links like [TOP PAGE](index.html), [index.html], [](index.html)
    l = l.replace(/\[\s*(?:TOP PAGE|TOP|index|目次|TOPPAGE)?\s*\]\([^\)]+\)/gi, '');
    l = l.replace(/\[\s*\]\([^\)]+\)/g, '');
    l = l.replace(/\[(?:index\.html|top|toppage|page)\]/gi, '');
    // Remove anchor links like [正教の奉神礼](#sokode)
    l = l.replace(/\[([^\]]+)\]\(#[^\)]+\)/g, '');
    // Unwrap regular links
    l = l.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
    // Strip markdown formatting symbols
    l = l.replace(/[*_#~`]/g, '');
    // Replace html entities
    l = l.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    // Clean outer quotes
    l = l.replace(/^[“”"']+|[”"']+$/g, '').trim();
    l = l.replace(/\s+/g, ' ');

    if (l.length < 8) continue;
    if (title && (l === title || l.startsWith(title))) continue;
    if (['リトゥルギア', '正教の奉神礼', '聖師父たちの言葉', 'みことばに立ち止まる', '教会の教え', 'はじめに'].includes(l)) continue;
    if (/^(?:Fr\.|Joost|Herman|By|翻訳|著|訳)\s/i.test(l)) continue;

    valid.push(l);
    if (valid.join(' ').length >= 140) break;
  }

  const res = valid.join(' ').replace(/\s+/g, ' ').trim();
  return res.length > 135 ? res.slice(0, 132) + '...' : res;
}

if (process.argv[1]?.endsWith('clean-snippet.mjs')) {
  for (const f of ['farthers', 'liturgy', 'conceptofchurch', 'khomiakov', 'whylent']) {
    const raw = fs.readFileSync(`archive/george/${f}.md`, 'utf8');
    console.log(`=== ${f} ===\n${cleanSnippet(raw, '')}\n`);
  }
}
