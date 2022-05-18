import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
  protected tableName = 'order_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.decimal('price')
      table.decimal('quantity')
      table
        .integer('food_item_id')
        .unsigned()
        .references('food_items.id')
        .onDelete('CASCADE') 

      table
        .integer('order_id')
        .unsigned()
        .references('orders.id')
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
