import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import { randomUUID } from 'node:crypto'
import ItemEntries from './item_entry.js'

export default class Item extends BaseModel {
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare quantity: number

  @column()
  declare measuring_unit: string

  @column()
  declare threshold: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => ItemEntries)
  declare itemEntries: HasMany<typeof ItemEntries>

  @beforeCreate()
  static assignUuid(item: Item) {
    item.id = randomUUID()
  }

  @beforeCreate()
  static setDefaultThreshold(item: Item) {
    if (item.threshold === undefined || item.threshold === null) {
      item.threshold = 20
    }
  }
}
