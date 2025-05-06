import firebaseAdmin from 'firebase-admin'

let isInitialized = false

export default function () {
  if (!isInitialized) {
    firebaseAdmin.initializeApp()

    isInitialized = true
  }

  return firebaseAdmin
}
