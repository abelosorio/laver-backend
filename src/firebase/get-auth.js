import getInitializedFirebaseAdmin from './firebase.service.js'

export default function () {
  return getInitializedFirebaseAdmin().auth()
}
