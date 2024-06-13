import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('name')
      table.integer('quantity')
      table.enu('measuring_unit', ['lt', 'kg', 'pcs', 'box', 'roll', 'pack', 'sheet'])
      table.integer('user_id').references('users.id').onDelete('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
