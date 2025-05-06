import fs from 'fs'
import path from 'path'

import { globbySync } from 'globby'
import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import gql from 'graphql-tag'
const typeDefs = [...scalarTypeDefs]
const graphQLFilePaths = globbySync(['./**/*.graphql'])
graphQLFilePaths.forEach((file) => {
  typeDefs.push(
    // @ts-expect-error
    gql(fs.readFileSync(path.join(process.cwd(), file), 'utf-8'))
  )
})

export default typeDefs
