import { Model } from 'sequelize'

import { UserAuthId } from './user-auth-id.model.js'
import fields from './user.fields.js'

export class User extends Model {
  static associate () {
    this.hasMany(UserAuthId)
  }
}

export default (sequelize) => {
  User.init(fields, {
    modelName: 'user',
    sequelize
  })

  return User
}
