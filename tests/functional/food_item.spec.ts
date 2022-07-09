import { test } from '@japa/runner'

test.group('Food Items', (group) => {
  test('Create food item', async ({ client }) => {
    const response = await client
    .post('/food')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    .json({
      "name": "Test Hot Wings",
      "price": 330,
      "description": "Hot Wings (6 Pcs)",
      "categoryId": 1
    })    
    response.assertStatus(201)
  })

  test('list all food items', async ({ client }) => {
    const response = await client
    .get('/food/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    
    response.assertStatus(200)
    response.assertBodyContains([{name: "Test Hot Wings"}])
  })


  test('Update food item', async ({ client }) => {
    
    const firstResponse = await client
    .get('/food/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    const body = JSON.parse(firstResponse.response.text)
    
    const response = await client
    .put('/food/'+body[0].id)
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    .json({
      "name": "Test Item",
      "price": 330,
      "description": "Hot Wings (6 Pcs)",
      "categoryId": 1
    })    
    response.assertStatus(200)
  })

  test('Delete menu types', async ({ client }) => {
    const firstResponse = await client
    .get('/food/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    const body = JSON.parse(firstResponse.response.text)

    const response = await client.delete('/food/'+body[0].id)
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')

    response.assertStatus(200)
  })
});