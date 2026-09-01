import { readFile, readdir } from 'node:fs/promises'
import { dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const labRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = resolve(labRoot, '..')
const roots = [resolve(contentRoot, 'index.html'), resolve(contentRoot, 'lessons'), resolve(contentRoot, 'reference')]

async function collect(path) {
  if (extname(path)) return [path]
  const entries = await readdir(path, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => collect(resolve(path, entry.name))))
  return nested.flat().filter((file) => extname(file) === '.html')
}

const files = (await Promise.all(roots.map(collect))).flat()
const failures = []

for (const file of files) {
  const html = await readFile(file, 'utf8')
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
  if (duplicates.length) failures.push(`${file}: duplicate ids ${[...new Set(duplicates)].join(', ')}`)

  const links = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1])
  for (const link of links) {
    if (/^(https?:|mailto:|#)/.test(link)) continue
    const target = resolve(dirname(file), link.split('#')[0])
    try { await readFile(target) } catch { failures.push(`${file}: broken link ${link}`) }
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Validated ${files.length} HTML files.`)
