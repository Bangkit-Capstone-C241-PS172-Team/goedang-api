import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'item_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.integer('item_id').references('items.id')
      table.enu('in_out', ['in', 'out'])
      table.integer('quantity')
      table.integer('price')
      table.integer('total')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}