import { ApolloServer } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'

import context from './context.js'
import { buildResolvers } from './resolvers.js'
import typeDefs from './schema.js'
import { IS_PRODUCTION } from '~/constants.js'

export default async function createGraphQLServer (app) {
  const resolvers = await buildResolvers()
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const server = new ApolloServer({
    schema,
    context,
    introspection: !IS_PRODUCTION,
    debug: !IS_PRODUCTION,
    formatError: (error) => {
      console.error(error)

      return error
    }
  })

  await server.start()

  server.applyMiddleware({ app, cors: false })

  return server
}
