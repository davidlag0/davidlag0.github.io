import { readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { join } from 'path';

const cssPath = join(process.cwd(), 'src/css/style.css');
const vercelPath = join(process.cwd(), 'vercel.json');

// Read source CSS
const css = readFileSync(cssPath, 'utf-8');

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
