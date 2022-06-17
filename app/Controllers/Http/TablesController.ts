import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Table from 'App/Models/Table'
import Ws from 'App/Services/Ws'
import Booking from 'App/Models/Booking'
import Database from '@ioc:Adonis/Lucid/Database'

export default class TablesController {
 
    public formatDateWithZone(date, tz) {
        var s = date.toLocaleString('en-GB', { timeZone: tz });
        var a = s.split(/\D/);
        return a[2] + '-' + a[1] + '-' + a[0] + ' ' + a[4] + ':' + a[5] + ':' + a[6];
    }
    
    public async index(){
        // let currentDateTime = this.formatDateWithZone(new Date, "Asia/Kathmandu");
        let currentDateTime = new Date();
        
        // let currentDateTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" }));

        console.log(currentDateTime);
        
        let bookings = await Booking.all()

        // let bookings = Database.rawQuery(
        //         'select * from bookings where booking_date_time > :currentDateTime',
        //         {
        //             currentDateTime: currentDateTime,
        //         }
        //       )
              
        const activeBookings : number[] = [];
        console.log(bookings.length);
        

        for(var i = 0; i < bookings.length; i++){
            let bookingStart = new Date(bookings[i].bookingDateTime.toString()).getTime()
            let bookingEnd = new Date(bookings[i].bookingEndDateTime.toString()).getTime()
            console.log(bookings[i].bookingDateTime);
            
            console.log(currentDateTime.getTime() >= bookingStart);
            console.log(currentDateTime.getTime() <= bookingEnd);
            
            if (currentDateTime.getTime() >= bookingStart && currentDateTime.getTime() <= bookingEnd){
                activeBookings.push(bookings[i].tableId);
            }
        }

        let tables = await Table.all();
        for (var i = 0; i < tables.length; i++){
            if(activeBookings.includes(tables[i].id)){
                tables[i].status = "reserved"
            }
        }
        let response = {"data": tables};
        return response;
    }
    public async store({request, response} : HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
            placement: schema.string({trim: true}),
        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await Table.create(payload)
        menu.status = "vacant";
        menu.save()
        response.status(201)
        return menu
    }

    public async show({params}: HttpContextContract){
        return Table.findOrFail(params.id)
    }

    public async update({params, request}: HttpContextContract){
        const newMenuSchema = schema.create({
            name: schema.string({trim: true}),
            placement: schema.string({trim: true}),
            status: schema.string({trim: true})
        })
        const payload = await request.validate({schema: newMenuSchema})
        const menu = await Table.findOrFail(params.id)
        menu.name = payload.name
        menu.placement = payload.placement
        menu.status = payload.status;
        return menu.save()
    
    }
    public async destroy({params}: HttpContextContract){
        const menu = await Table.findOrFail(params.id)
        return menu.delete()
    }
}

