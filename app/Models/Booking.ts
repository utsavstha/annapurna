import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tableId: number;

  @column()
  public firstName: string;

  @column()
  public lastName: string;

  @column()
  public bookingDateTime: String;

  @column()
  public bookingEndDateTime: String;

  @column()
  public contactInformation: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
