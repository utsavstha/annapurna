import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Categories from 'App/Models/Category';

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Categories)
  public categories: HasMany<typeof Categories>
}
