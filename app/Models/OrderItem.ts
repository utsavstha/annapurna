import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public foodItemId: number;

  @column()
  public orderId: number;


  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public quantity: number;

  @column()
  public isCooked: boolean;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
