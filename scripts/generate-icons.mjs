// Regenerates every favicon from public/logos/icon.svg. Run after changing the logo:
//   node scripts/generate-icons.mjs
import { copyFile, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const INK = '#1C1917'
const source = await readFile('public/logos/icon.svg')

async function icon(size, padding = 0.12) {
  const inner = Math.round(size * (1 - padding * 2))
  const glyph = await sharp(source, { density: 600 }).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: glyph, gravity: 'center' }])
    .png()
    .toBuffer()
}

await writeFile('public/apple-touch-icon.png', await icon(180))
await writeFile('public/android-chrome-192x192.png', await icon(192))
await writeFile('public/android-chrome-512x512.png', await icon(512))
await copyFile('public/logos/icon.svg', 'public/icon.svg')

// A .ico is a small header followed by a PNG.
const png = await icon(32, 0.06)
const header = Buffer.alloc(22)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
header[6] = 32
header[7] = 32
header.writeUInt16LE(1, 10)
header.writeUInt16LE(32, 12)
header.writeUInt32LE(png.length, 14)
header.writeUInt32LE(22, 18)
await writeFile('public/favicon.ico', Buffer.concat([header, png]))
console.log('icons written')
