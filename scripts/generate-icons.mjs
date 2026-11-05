// Regenerates every favicon from public/logos/icon.svg. Run after changing the logo:
//   node scripts/generate-icons.mjs
import { copyFile, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const VANILLE = '#FFCF00'
const source = await readFile('public/logos/icon.svg')
const render = (size) => sharp(source, { density: 600 }).resize(size, size).png().toBuffer()

// Phones crop home screen icons themselves, so these fill the square with the icon's own vanilla.
async function homeScreenIcon(size) {
  return sharp({ create: { width: size, height: size, channels: 4, background: VANILLE } })
    .composite([{ input: await render(size), gravity: 'center' }])
    .png()
    .toBuffer()
}

await writeFile('public/apple-touch-icon.png', await homeScreenIcon(180))
await writeFile('public/android-chrome-192x192.png', await homeScreenIcon(192))
await writeFile('public/android-chrome-512x512.png', await homeScreenIcon(512))
await copyFile('public/logos/icon.svg', 'public/icon.svg')

// A .ico is a small header followed by a PNG. It keeps the round shape in browser tabs.
const png = await render(32)
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
