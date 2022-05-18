import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PasswordReset extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public code: number

  @column()
  public email: String

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
