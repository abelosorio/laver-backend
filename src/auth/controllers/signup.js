import UnauthorizedError from '../errors/unauthorized.js'

import getAuth from '~/firebase/get-auth.js'
import { User } from '~/user/models/user.model.js'
import { UserAuthId } from '~/user/models/user-auth-id.model.js'

export default async function (_, { idToken }) {
  const firebaseUser = await getFirebaseUserOrFail(idToken)

  const userAuthId = await UserAuthId.findOne({
    where: { authId: firebaseUser.uid }
  })

  // A user with this firebase id exists. Most common case.
  if (userAuthId) return userAuthId.getUser()

  const user = await User.findOne({ where: {
    email: firebaseUser.email
  }})

  // The user with the same email exists but it doesn't have a corresponding
  // auth id. This only happens if they signed up with Google and then they
  // created a email and password account. Or viceversa.
  if (user) {
    await UserAuthId.create({ userId: user.id, authId: firebaseUser.uid })

    return user
  }

  // User is new. This is a regular signup.
  const newUserAuthId = await UserAuthId.create({
    user: { email: firebaseUser.email },
    authId: firebaseUser.uid
  }, {
    include: [User]
  })

  return newUserAuthId.getUser()
}

async function getFirebaseUserOrFail (idToken) {
  const auth = getAuth()
  let firebaseUser

  try {
    firebaseUser = await auth.verifyIdToken(idToken)
  } catch (_) {
    console.error(_)

    throw new UnauthorizedError()
  }

  if (!firebaseUser) {
    throw new UnauthorizedError()
  }

  return firebaseUser
}
