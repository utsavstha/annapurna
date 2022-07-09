import { test } from '@japa/runner'

test.group('table', (group) => {
  test('Create table item', async ({ client }) => {
    const response = await client
    .post('/table')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    .json({
        "name": "T7",
        "placement": "First Floor",
        "status": "vacant"
    })    
   
    response.assertStatus(201)
  })

  test('list all table items', async ({ client }) => {
    const response = await client
    .get('/table/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    
    response.assertStatus(200)
  })

  test('Update table item', async ({ client }) => {
    
    const firstResponse = await client
    .get('/table/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    const body = JSON.parse(firstResponse.response.text)
    
    const response = await client
    .put('/table/'+body.data[0].id)
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    .json({
      "name": "T7 test",
      "placement": "First Floor",
      "status": "vacant"
      
    })    
    response.assertStatus(200)
  })


  test('Delete table types', async ({ client }) => {
    const firstResponse = await client
    .get('/table/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    const body = JSON.parse(firstResponse.response.text)

    const response = await client.delete('/table/'+body.data[0].id)
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')

    response.assertStatus(200)
  })
});