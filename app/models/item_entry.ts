import { DateTime } from 'luxon'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import Item from './item.js'

export default class ItemEntries extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @hasOne(() => Item)
  declare item_id: HasOne<typeof Item>

  @column()
  declare in_out: boolean

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column()
  declare total: number

  @hasOne(() => User)
  declare user_id: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
