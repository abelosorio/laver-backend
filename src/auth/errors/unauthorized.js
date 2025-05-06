import { GraphQLError } from 'graphql'

export default class UnauthorizedError extends GraphQLError {
  constructor (message = 'Unauthorized') {
    super(message, {
      extensions: {
        code: 'UNAUTHORIZED',
        http: {
          status: 401
        }
      }
    })
  }
}
