import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ItemLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare item_id: number

  @column()
  declare in_out: boolean

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
}
