import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'
import {schema} from '@ioc:Adonis/Core/Validator'


export default class NotificationsController {
    public async index(){
        return Notification.all()
    }

    public async store({request, response} : HttpContextContract){
        const newMenuSchema = schema.create({
            table_name: schema.string({trim: true}),
            product_name: schema.string({trim: true}),
            quantity: schema.string({trim: true}),

        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await Notification.create(payload)
        response.status(201)
        return menu
    }

    public async show({params}: HttpContextContract){
        return Notification.findOrFail(params.id)
    }

    // public async update({params, request}: HttpContextContract){
    //     const newMenuSchema = schema.create({
    //         name: schema.string({trim: true}),
        
    //     })
    //     const payload = await request.validate({schema: newMenuSchema})
    //     const menu = await Menu.findOrFail(params.id)
    //     menu.name = payload.name
    //     return menu.save()
    
    // }
    public async destroy({params}: HttpContextContract){
        const menu = await Notification.findOrFail(params.id)
        return menu.delete()
    }
}
