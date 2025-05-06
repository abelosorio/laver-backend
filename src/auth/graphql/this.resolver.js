import getCurrentUser from '../controllers/get-current-user.js'
import signup from '../controllers/signup.js'

export default {
  Mutation: {
    signup
  },
  Query: {
    currentUser: getCurrentUser
  }
}
