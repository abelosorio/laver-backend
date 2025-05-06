import { Model } from 'sequelize'

import fields from './shop.fields.js'

export class Shop extends Model {}

export default (sequelize) => {
  Shop.init(fields, {
    modelName: 'shop',
    sequelize
  })

  return Shop
}
