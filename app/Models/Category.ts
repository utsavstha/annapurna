import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import FoodItem from 'App/Models/FoodItem';

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public name: string;

  // @column()
  // public menuId: number;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => FoodItem)
  public foodItems: HasMany<typeof FoodItem>
}
