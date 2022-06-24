import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Menu from 'App/Models/Menu'
export default class MenusController {
    public async index(){
        return Menu.all()
    }
    public async store({request, response} : HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await Menu.create(payload)
        response.status(201)
        return menu
    }
    public async show({params}: HttpContextContract){
        return Menu.findOrFail(params.id)
    }

    public async update({params, request}: HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
        
        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await Menu.findOrFail(params.id)
        menu.name = payload.name
        return menu.save()
    
    }
    public async destroy({params}: HttpContextContract){
        const menu = await Menu.findOrFail(params.id)
        return menu.delete()
    }
}
