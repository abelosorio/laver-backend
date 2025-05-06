import getAuth from '~/firebase/get-auth.js'
import { User } from '~/user/models/user.model.js'
import { UserAuthId } from '~/user/models/user-auth-id.model.js'

export default async function (token) {
  const auth = getAuth()

  if (!token) return null

  try {
    const decodedToken = await auth.verifyIdToken(token)
    const firebaseUser = await auth.getUser(decodedToken.uid)

    return User.findOne({
      include: [{
        model: UserAuthId,
        where: { authId: firebaseUser.uid }
      }]
    })
  } catch (error) {
    console.error(error)

    return null
  }
}
