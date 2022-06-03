import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FoodItems extends BaseSchema {
  protected tableName = 'food_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.decimal('price')
      table.string('description')
      table.boolean('is_cooked')
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE') 
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
