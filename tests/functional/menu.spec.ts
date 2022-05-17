import { test } from '@japa/runner'

test('list all menu types', async ({ client }) => {
  const response = await client.get('/menus')

  response.assertStatus(200)
  response.assertBodyContains([{name: "Beverages"}])
})

test('Create menu types', async ({ client }) => {
  const response = await client.post('/menus').json({
    "name": "Breakfast",
    "status": true
  })

  response.assertStatus(201)
})

test('Update menu types', async ({ client }) => {
  const response = await client.put('/menus/2').json({
    "name": "Lunch",
    "status": true

  })

  response.assertStatus(200)
  response.assertBodyContains([{name: "Lunch"}])
})

test('Delete menu types', async ({ client }) => {
  
  const response = await client.delete('/menus/8')

  response.assertStatus(200)
})
