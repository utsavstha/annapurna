import { test } from '@japa/runner'

test.group('Category', (group) => {
  test('Create category item', async ({ client }) => {
    const response = await client
    .post('/category')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    .json({
      "name": "Test Category",
    })    
    response.assertStatus(200)
  })

  test('list all category items', async ({ client }) => {
    const response = await client
    .get('/category/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    
    response.assertStatus(200)
    response.assertBodyContains([{name: "Test Category"}])
  })


  test('Update category item', async ({ client }) => {
    
    const firstResponse = await client
    .get('/category/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    const body = JSON.parse(firstResponse.response.text)
    
    const response = await client
    .put('/category/'+body[0].id)
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    .json({
      "name": "Test Category updated",
      
    })    
    response.assertStatus(200)
  })

  test('Delete menu types', async ({ client }) => {
    const firstResponse = await client
    .get('/category/')
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')
    const body = JSON.parse(firstResponse.response.text)

    const response = await client.delete('/category/'+body[0].id)
    .header('Authorization', 'Bearer MjE2.v5Jnmq8zftZ0_ZKEVz1F0r3q9gNeR9CoeLJ4Scu6nGoEpPgo8k_UKYilqjkf')

    response.assertStatus(200)
  })
});