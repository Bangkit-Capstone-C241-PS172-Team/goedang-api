import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave } from '@adonisjs/lucid/orm'
// import Item from './item.ts'

// Your code here

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare itemId: number

  @column()
  declare inOut: boolean

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async adjustQuantity(stock: Stock) {
    if (!stock.inOut) {
      stock.quantity = -Math.abs(stock.quantity)
    } else {
      stock.quantity = Math.abs(stock.quantity)
    }
    stock.total = Math.abs(stock.quantity * stock.price)
  }

  // @afterSave()
  // static async updateItemQuantity(stock: Stock) {
  //   const item = await Item.find(stock.itemId)
  //   if (item) {
  //     const totalQuantity = await Stock.query()
  //       .where('itemId', stock.itemId)
  //       .sum('quantity as total')
  //       .first()
  //     item.quantity = totalQuantity.total
  //     await item.save()
  //   }
  // }
}
