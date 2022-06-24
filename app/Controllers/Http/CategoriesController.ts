import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import FoodItem from 'App/Models/FoodItem'

import {schema} from '@ioc:Adonis/Core/Validator'

export default class CategoriesController {
    public async index(){
        return Category.all()
    }

    public async fetchAll(){
        let categories = await Category.query().orderBy('id', 'asc')
        var response = new Array()
        for (var i = 0; i < categories.length; i++){
            // let foodItems = await FoodItem.findBy('category_id', categories[i].id);
            let foodItems = await FoodItem
            .query()
            .where('category_id', '=',  categories[i].id)
       
            response.push({"category_name": categories[i].name, "category_id": categories[i].id, "items": foodItems})            
        }
        return response
    }

    public async store({request, response} : HttpContextContract){
        const newcategorySchema = schema.create({
            name: schema.string({trim: true})
        })
        const payload = await request.validate({schema: newcategorySchema})
        const category = await Category.create(payload)
        response.status(200)
        return category
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
