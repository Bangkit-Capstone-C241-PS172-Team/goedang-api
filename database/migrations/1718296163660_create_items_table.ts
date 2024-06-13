import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('name')
      table.integer('quantity')
      table.enu('measuring_unit', ['in', 'out'])
      table.integer('user_id').references('users.id')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
