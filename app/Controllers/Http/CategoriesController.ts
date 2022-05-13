import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import {schema} from '@ioc:Adonis/Core/Validator'

export default class CategoriesController {
    public async index(){
        return Category.all()
    }
    public async store({request, response} : HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
            menuId: schema.number()
        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await Category.create(payload)
        response.status(201)
        return menu
    }

    public async show({params}: HttpContextContract){
        return Category.findOrFail(params.id)
    }

    public async update({params, request}: HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
            status: schema.boolean()
        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await Category.findOrFail(params.id)
        menu.name = payload.name

        return menu.save()
    
    }
    public async destroy({params}: HttpContextContract){
        const menu = await Category.findOrFail(params.id)
        return menu.delete()
    }
}
