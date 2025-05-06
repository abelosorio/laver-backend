import path from 'path'
import { fileURLToPath } from 'url'
import { globbySync } from 'globby'

export async function buildResolvers () {
  const dirname = fileURLToPath(new URL('.', import.meta.url))
  const resolverPaths = globbySync([
    path.join(dirname, '..', '..', '**', '*.resolver.js')
  ])

  const resolvers = await Promise.all(
    resolverPaths.map(async (file) => {
      const importResult = await import(path.resolve(process.cwd(), file))

      return importResult.default
    })
  )

  return resolvers
}
