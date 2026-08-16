import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

const siteDir = join(process.cwd(), '_site');
const vercelPath = join(process.cwd(), 'vercel.json');

// Read the generated HTML
const html = readFileSync(join(siteDir, 'index.html'), 'utf8');

// Extract CSS from <style> tag
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) {
  console.error('No <style> tag found in HTML');
  process.exit(1);
}

const css = styleMatch[1].trim();

// Compute sha256 hash
const hash = createHash('sha256').update(css).digest('base64');
const cspHash = `'sha256-${hash}'`;

console.log(`CSS hash: ${cspHash}`);

// Read vercel.json
const vercel = JSON.parse(readFileSync(vercelPath, 'utf8'));

// Update CSP headers with the hash for style-src-elem
for (const headerGroup of vercel.headers) {
  for (const header of headerGroup.headers) {
    if (header.key === 'Content-Security-Policy') {
      // Remove any existing sha256 hash for style-src-elem
      header.value = header.value.replace(
        /style-src-elem 'self'( 'sha256-[^']+')?/,
        `style-src-elem 'self' ${cspHash}`
      );
    }
  }
}

// Write updated vercel.json
writeFileSync(vercelPath, JSON.stringify(vercel, null, 2) + '\n');
console.log('Updated vercel.json with CSS hash');
