import { Shop } from '../models/shop.model.js'

export default function () {
  return Shop.findAll()
}
