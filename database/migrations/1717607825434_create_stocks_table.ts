import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stocks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('itemId')
      table.boolean('inOut')
      table.integer('quantity')
      table.integer('price')
      table.integer('total')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
