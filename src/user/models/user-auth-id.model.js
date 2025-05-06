import { Model } from 'sequelize'

import { User } from './user.model.js'
import fields from './user-auth-id.fields.js'

export class UserAuthId extends Model {
  static associate () {
    this.belongsTo(User, { foreignKey: 'userId' })
  }
}

export default (sequelize) => {
  UserAuthId.init(fields, {
    sequelize,
    tableName: 'user_auth_id'
  })

  return UserAuthId
}
