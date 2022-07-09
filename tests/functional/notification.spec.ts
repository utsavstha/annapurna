import { test } from '@japa/runner'

test.group('notification Items', (group) => {
  test('Create notification item', async ({ client }) => {
    const response = await client
    .post('/notification')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    .json({
      "table_name": "Annapurna",
      "quantity": "2",
      "product_name": "Hot Wings (6 Pcs)"
    })    
   
    response.assertStatus(201)
  })

  test('list all notification items', async ({ client }) => {
    const response = await client
    .get('/notification/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    
    response.assertStatus(200)
  })


  test('Delete menu types', async ({ client }) => {
    const firstResponse = await client
    .get('/notification/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    const body = JSON.parse(firstResponse.response.text)

    const response = await client.delete('/notification/'+body[0].id)
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')

    response.assertStatus(200)
  })
});