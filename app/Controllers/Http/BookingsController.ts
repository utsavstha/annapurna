import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Booking from 'App/Models/Booking'
import Database from '@ioc:Adonis/Lucid/Database'

import { rules, schema } from '@ioc:Adonis/Core/Validator'
export default class BookingsController {
    public async index(){
        return Booking.all()
    }

    public async fetchAll(){
        console.log(new Date());
        
        let bookings = await Booking
            .query()
            .where('booking_date_time', '>',  new Date())
        // let categories = await Booking.query().orderBy('id', 'asc')
        // var response = new Array()
        // for (var i = 0; i < categories.length; i++){
        //     // let foodItems = await FoodItem.findBy('category_id', categories[i].id);
        //     let foodItems = await Booking
        //     .query()
        //     .where('category_id', '=',  categories[i].id)
       
        //     response.push({"category_name": categories[i].name, "category_id": categories[i].id, "items": foodItems})            
        // }
        return bookings
    }

    public async store({request, response} : HttpContextContract){
        let tableId = request.body().tableId;
        
        const newSchema = schema.create({
            tableId: schema.number(),
            firstName: schema.string({trim: true}),
            lastName: schema.string({trim: true}),
            contactInformation: schema.string({trim: true}, [rules.minLength(10)]),
            bookingDateTime: schema.string({}, [rules.required()]),
            bookingEndDateTime: schema.string({}, [rules.required()]),

        })
        let bookings = await Database.rawQuery('select 1 from bookings WHERE booking_date_time >= \'' + request.body().bookingDateTime + "\' and booking_end_date_time <= \'" + request.body().bookingEndDateTime +'\' and table_id=\''+tableId+'\'')
        // return bookings
        if (bookings[0].length > 0){
            response.status(422)
            let res = {
                "error": "Booking already existings for this interval"
            }
            return res;
        } else{
            const payload = await request.validate({schema: newSchema})
            const booking = await Booking.create(payload)
            response.status(200)
            return booking
        }    
        
    }

    
    public async show({params}: HttpContextContract){
        return Booking.findOrFail(params.id)
    }

    public async update({params, request, response}: HttpContextContract){
        const newSchema = schema.create({
            tableId: schema.number(),
            firstName: schema.string({trim: true}),
            lastName: schema.string({trim: true}),
            contactInformation: schema.string({trim: true}, [rules.mobile()]),
            bookingDateTime: schema.string({}, [rules.required()]),
            bookingEndDateTime: schema.string({}, [rules.required()]),

        })

        let bookings = await Database.rawQuery('select 1 from bookings WHERE booking_date_time >= \'' + request.body().bookingDateTime + "\' and booking_end_date_time <= \'" + request.body().bookingEndDateTime +'\' and id != ' + params.id)
        // return bookings
      
        if (bookings[0].length > 0){
            response.status(422)
            let res = {
                "error": "Booking already existings for this interval"
            }
            return res;
        } else{
            const payload = await request.validate({schema: newSchema})
            var model = await Booking.findOrFail(params.id)
            model.tableId = payload.tableId
            model.firstName = payload.firstName
            model.lastName = payload.lastName
            model.contactInformation = payload.contactInformation
            model.bookingDateTime = payload.bookingDateTime
            model.bookingEndDateTime = payload.bookingEndDateTime

            return model.save()
        }
    
    }
    public async destroy({params}: HttpContextContract){
        const menu = await Booking.findOrFail(params.id)
        return menu.delete()
    }
}
