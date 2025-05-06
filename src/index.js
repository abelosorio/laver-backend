import { createServer } from 'http'

import cors from 'cors'
import express from 'express'

import createGraphQLServer from './graphql/create-graphql-server.js'
import { PORT, ALLOWED_CORS_ORIGINS_REGEX } from './constants.js'
import '~/sequelize/index.js'

;(async () => {
  const corsOriginsRegex = new RegExp(ALLOWED_CORS_ORIGINS_REGEX ?? /^\b$/)
  const app = express()

  app.use(express.json())
  app.set('trust proxy', 1)
  app.use(
    cors({
      origin: corsOriginsRegex,
      credentials: true,
      exposedHeaders: ['Content-Disposition']
    })
  )

  const httpServer = createServer(app)
  const graphQLServer = await createGraphQLServer(app)

  httpServer.listen({ port: PORT }, () => {
    console.log(
      'Server ready at ' +
      `http://localhost:${PORT}${graphQLServer?.graphqlPath ?? ''}`
    )
  })
})().catch(console.error)
