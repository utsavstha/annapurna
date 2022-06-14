import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('table_id')
        .unsigned()
        .references('tables.id')
        .onDelete('CASCADE')
      table.string('first_name')
      table.string('last_name')
      table.timestamp("booking_date_time")
      table.timestamp("booking_end_date_time")

      table.string('contact_information')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
