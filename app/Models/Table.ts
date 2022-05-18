import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'
import Order from './Order';
import Booking from './Booking';

export default class Table extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string;

  @column()
  public placement: string;

  @column()
  public status: string;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @hasOne(() => Order)
  public order: HasOne<typeof Order>

  @hasMany(() => Booking)
  public booking: HasMany<typeof Booking>
}
