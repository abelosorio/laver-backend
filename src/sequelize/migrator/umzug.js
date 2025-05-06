import path from 'path'
import { fileURLToPath } from 'url'
import { SequelizeStorage, Umzug } from 'umzug'

import { buildSequelizeInstance } from '../instance.js'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename)
const sequelize = buildSequelizeInstance()

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.js', { cwd: __dirname }]
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta'
  }),
  logger: console
})
