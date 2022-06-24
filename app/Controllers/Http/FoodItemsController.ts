import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FoodItem from 'App/Models/FoodItem'
import {schema, rules} from '@ioc:Adonis/Core/Validator'
export default class FoodItemsController {
    public async index(){
        return FoodItem.all()
    }

    public async store({request, response} : HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
            price: schema.number([
                rules.range(50, 5000)
              ]),
            categoryId: schema.number(),
            description: schema.string({trim: true}),
        })
        const payload = await request.validate({schema: newMenuSchema})
        const item = await FoodItem.create(payload)
        response.status(201)
        return item
    }

    public async show({params}: HttpContextContract){
        return FoodItem.findOrFail(params.id)
    }

    public async update({params, request}: HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
            price: schema.number(),
            categoryId: schema.number(),
            description: schema.string({trim: true}),
        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await FoodItem.findOrFail(params.id)
        menu.name = payload.name
        menu.price = payload.price
        menu.categoryId = payload.categoryId
        menu.description = payload.description
        return menu.save()
    }
    
    public async destroy({params}: HttpContextContract){
        const menu = await FoodItem.findOrFail(params.id)
        return menu.delete()
    }
    
}
