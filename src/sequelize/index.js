import path from 'path'
import { URL, fileURLToPath } from 'url'
import { globbySync } from 'globby'
import { isFunction } from 'lodash-es'
import { Sequelize } from 'sequelize'

import buildSequelizeConfig from './config.js'

const dirname = fileURLToPath(new URL('.', import.meta.url))
const cwd = process.cwd()
const sequelize = new Sequelize(buildSequelizeConfig())
const modelPaths = globbySync([
  path.join(dirname, '..', '..', '**', '*.model.js')
])
const models = []

await Promise.all(
  modelPaths.map(async (file) => {
    const { default: defaultExport } = await import(path.resolve(cwd, file))

    if (isFunction(defaultExport)) {
      models.push(defaultExport(sequelize))
    }
  })
)

for (const model of models) {
  model.associate?.(sequelize.models)
}

export default sequelize
