import request from 'supertest'
import app from '@/main/config/app'

describe('Register route', () => {
  test('should return an account on sucess', async () => {
    app.post('/test-cors', (req, res) => {
      res.send()
    })
    await request(app)
      .post('/api/register')
      .send({
        name: 'Any name',
        email: 'any@mail.com'
      })
      .expect(201)
  })
})
