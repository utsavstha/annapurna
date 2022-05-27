import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema} from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem';
import Table from 'App/Models/Table';

export default class OrdersController {
    public async index ({}) {
        // return {"data": Table.all()};
        return Order.all();

    }

    public async activeOrders(){
        let orders = await Order.query().where("closed", false).orderBy('id', 'asc')
        var response = new Array()
        for (var i = 0; i < orders.length; i++){
            // let foodItems = await FoodItem.findBy('category_id', categories[i].id);
            let orderItems = await OrderItem
            .query()
            .where('order_id', '=',  orders[i].id)

            let table = await Table.query().where('id', orders[i].tableId).first();
            if (orderItems.length > 0){
                response.push({"table_name": table!.name, "order_id": orders[i].id, "items": orderItems})            
            }
        }
        return response
    }

    
    public async history(){
        let orders = await Order.query().where("closed", true).orderBy('id', 'asc')
        var response = new Array()
        for (var i = 0; i < orders.length; i++){
            // let foodItems = await FoodItem.findBy('category_id', categories[i].id);
            let orderItems = await OrderItem
            .query()
            .where('order_id', '=',  orders[i].id)
            let table = await Table.query().where('id', orders[i].tableId).first();
            if (orderItems.length > 0){
                response.push({"table_name": table!.name, "order_id": orders[i].id, "items": orderItems})            
            }
        }
        return response
    }

    public async fetchAll(){
        let orders = await Order.query().where("closed", false).orderBy('id', 'asc')
        var response = new Array()
        for (var i = 0; i < orders.length; i++){
            // let foodItems = await FoodItem.findBy('category_id', categories[i].id);
            let orderItems = await OrderItem
            .query()
            .where('order_id', '=',  orders[i].id)
            .where('is_cooked', 0)
            let table = await Table.query().where('id', orders[i].tableId).first();
            if (orderItems.length > 0){
                response.push({"table_name": table!.name, "order_id": orders[i].id, "items": orderItems})            
            }
        }
        return response
    }

    public async transactionHistory(){
        let orders = await Order.query().where("closed", true).orderBy('id', 'asc')
        var response = new Array()
        for (var i = 0; i < orders.length; i++){
            // let foodItems = await FoodItem.findBy('category_id', categories[i].id);
            let orderItems = await OrderItem
            .query()
            .where('order_id', '=',  orders[i].id)
            let table = await Table.query().where('id', orders[i].tableId).first();
            response.push({"table_name": table!.name, "order_id": orders[i].id, "items": orderItems})            
        }
        return response
    }

    public async closeOrder({params, request, response} : HttpContextContract){
        const newSchema = schema.create({
            total: schema.number(),
            discount: schema.number()
        })
        const payload = await request.validate({schema: newSchema})

        const order = await Order.findOrFail(params.id);
        order.closed = true;
        order.total = payload.total
        order.discount = payload.discount

        let table = await Table.query().where('id', order.tableId).first();
        table!.status = "vacant";
        order.save()
        table!.save()
        return {"status": "success"}
    }


    public async orderForTable({params}){
        let tableId = params.id;
        console.log(tableId);
        let order = await Order.query().where('table_id', tableId).andWhere("closed", false).first()
        // let order = await Database.rawQuery("select id from orders where table_id = " + tableId + " AND closed != 1")
        // console.log("select id from orders where table_id = " + tableId + " AND closed != 1");
        
        // console.log(order);
        
        let orderItems = await OrderItem.query().where('order_id', '=', order!.id).andWhere('quantity', '>', 0);

        return orderItems;
    }

    public async store({request, response} : HttpContextContract){
        const newSchema = schema.create({
            tableId: schema.number(),
        })
        let body = request.body()
        //Check if table is available
        let table = await Table.findOrFail(body.tableId);
        if (table.status == "vacant"){
            table.status = "occupied"
            table.save()
        }
     
        let orders = body.orders;
        console.log(typeof orders);
        
        const payload = await request.validate({schema: newSchema})
        const model = await Order.create(payload)

        model.save()

        for(var i = 0; i < orders.length; i++){
            let foodItemId = orders[i].id
            let name = orders[i].name
            let price = orders[i].price
            let quantity = orders[i].quantity
            let orderId = model.id
            const orderItem = await OrderItem.create({foodItemId, name, price, quantity, orderId})
            console.log(orders[i]);
            
        }
        
        response.status(201)
        return {"status": "success"};
    }

    public async show({params}: HttpContextContract){
        return Order.findOrFail(params.id)
    }

    public async setCooked({params}: HttpContextContract){
        const item = await OrderItem.findOrFail(params.id)
        item.isCooked = true
        item.save()
    }

    public async update({request, response} : HttpContextContract){
       
        let body = request.body()
        //Check if table is available
        let table = await Table.findOrFail(body.tableId);
        if (table.status == "vacant"){
            table.status = "occupied"
            table.save()
        }
     
        let orders = body.orders;
        console.log(typeof orders);
        
        // const payload = await request.validate({schema: newSchema})
        let order = await Order.query().where('table_id', body.tableId).andWhere("closed", false).first()
        console.log(body.tableId);
        
        for(var i = 0; i < orders.length; i++){
            let foodItemId = orders[i].id
            let name = orders[i].name
            let price = orders[i].price
            let quantity = orders[i].quantity
            let orderId = order?.id
            let orderItem = await OrderItem.query().where('food_item_id', foodItemId).andWhere("order_id", orderId!).first()
            // console.log(orderItem);
            
            if (orderItem != null){
                orderItem!.quantity! = quantity;
                orderItem!.save()
                console.log("updated");
                
            }else{
                console.log("created");
                
                await OrderItem.create({foodItemId, name, price, quantity, orderId})

            }
            console.log(orders[i]);
            
        }
        
        response.status(201)
        return {"status": "success"};
    
    }
    public async destroy({params}: HttpContextContract){
        const menu = await Order.findOrFail(params.id)
        return menu.delete()
    }
}

