import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Item from './item.js'

export default class ItemEntries extends BaseModel {
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

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Item)
  declare item: BelongsTo<typeof Item>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
