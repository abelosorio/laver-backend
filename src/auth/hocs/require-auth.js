import UnauthorizedError from '../errors/unauthorized.js'

export default function (controller) {
  return (parent, args, context, info) => {
    if (!context.user) {
      throw new UnauthorizedError()
    }

    return controller(parent, args, context, info)
  }
}
