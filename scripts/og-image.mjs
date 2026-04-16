import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0d0f13"/>
  <text x="80" y="280" fill="#e8eaf0" font-family="Helvetica, Arial, sans-serif" font-size="96" font-weight="700">Yago Matsura</text>
  <text x="80" y="360" fill="#9aa0ab" font-family="Helvetica, Arial, sans-serif" font-size="44" font-weight="400">Law + Computer Science</text>
  <text x="80" y="420" fill="#9aa0ab" font-family="Helvetica, Arial, sans-serif" font-size="28" font-weight="400">Legal tech · IP · tech policy</text>
  <text x="80" y="550" fill="#7aa2ff" font-family="ui-monospace, 'SF Mono', monospace" font-size="28" font-weight="500">yagomatsura.dev</text>
</svg>
`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
await writeFile('public/og-image.png', png);
console.log('Wrote public/og-image.png');
