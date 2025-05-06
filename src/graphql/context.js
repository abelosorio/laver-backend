import getUserFromToken from '~/auth/use-cases/get-user-from-token.js'

export default async function ({ req, res }) {
  const user = await getUserFromToken(req.headers.authorization?.split(' ')[1])

  return {
    req,
    res,
    user
  }
}
