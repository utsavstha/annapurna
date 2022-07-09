/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// Route.get('/', async () => {
//   return { hello: 'world' }
// })
Route.group(() => {
  Route.resource('menus', 'MenusController').apiOnly;
  Route.resource('category', 'CategoriesController').apiOnly;
  Route.get('fetch_items_by_category', 'CategoriesController.fetchAll');
  Route.get('orderForTable/:id', 'OrdersController.orderForTable');
  Route.get('fetchAll', 'OrdersController.fetchAll');
  Route.get('orderHistory', 'OrdersController.history');
  Route.get('activeOrders', 'OrdersController.activeOrders');
  Route.get('transactionHistory', 'OrdersController.transactionHistory');
  Route.get('fetchAllBooking', 'BookingsController.fetchAll');
  Route.get('users', 'Users/AuthController.users');
  Route.get('users/:id', 'Users/AuthController.getUser');
  Route.get('setCooked/:id', 'OrdersController.setCooked');

  Route.patch('updateOrder', 'OrdersController.update');
  Route.post('closeOrder/:id', 'OrdersController.closeOrder');
  Route.put('users/:id', 'Users/AuthController.update');
  Route.delete('users/:id', 'Users/AuthController.delete');
  Route.resource('food', 'FoodItemsController').apiOnly;
  Route.resource('table', 'TablesController').apiOnly;
  Route.resource('order', 'OrdersController').apiOnly;
  Route.resource('booking', 'BookingsController').apiOnly;
  Route.resource('notification', 'NotificationsController').apiOnly;
}).middleware('auth')


Route.group(() => {
  // registration logic
  Route.post('register', 'Users/AuthController.register').as('register')
  Route.post('login', 'Users/AuthController.login').as('login')
  Route.post('logout', 'Users/AuthController.logout').as('logout')
  Route.post('sendResetCode', 'Users/AuthController.sendResetCode')
  Route.post('resetCode', 'Users/AuthController.resetCode')
  Route.post('/reset-password/:email', 'Users/AuthController.resetPassword').as('reset.password')
}).prefix('users/')