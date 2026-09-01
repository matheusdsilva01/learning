import { spawnSync } from 'node:child_process'
import { unlink, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const probe = resolve(root, 'src/features/catalog/__boundary-probe__.ts')
const eslintBin = resolve(root, 'node_modules/eslint/bin/eslint.js')
const depcruiseBin = resolve(root, 'node_modules/dependency-cruiser/bin/dependency-cruise.mjs')

await writeFile(probe, "import { CartWidget } from '@/features/cart'\nvoid CartWidget\n", 'utf8')

try {
  const eslint = spawnSync(process.execPath, [eslintBin, probe], { cwd: root, encoding: 'utf8' })
  const eslintOutput = `${eslint.stdout}\n${eslint.stderr}`
  if (eslint.status === 0 || !eslintOutput.includes('boundaries/dependencies')) {
    throw new Error(`ESLint did not reject the cross-feature probe.\n${eslintOutput}`)
  }

  const depcruise = spawnSync(process.execPath, [depcruiseBin, 'src'], { cwd: root, encoding: 'utf8' })
  const depcruiseOutput = `${depcruise.stdout}\n${depcruise.stderr}`
  if (depcruise.status === 0 || !depcruiseOutput.includes('feature-dependencies')) {
    throw new Error(`Dependency Cruiser did not reject the cross-feature probe.\n${depcruiseOutput}`)
  }

  console.log('Both architecture tools rejected the cross-feature probe.')
} finally {
  await unlink(probe).catch(() => {})
}
