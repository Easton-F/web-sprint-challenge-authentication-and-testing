// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('server.js', () => {
  describe('auth register', () => {
    it ('should return OK status on succesful registration', async () => {
      const expectedStatusCode = 201
      const response = await request(server).post('/api/auth/register').send({ username: 'Ben', password: '9999' })

      expect(response.status).toEqual(expectedStatusCode)
    })
    it ('should return status 422 if name is taken', async () => {
      const expectedStatusCode = 422
      const response = await  request(server).post('/api/auth/register').send({ username: 'Easton', password: '1234' })

      expect(response.status).toEqual(expectedStatusCode)
    })
  })
  describe('auth login', () => {
    it ('should respond with message "Welcome <user>" on successful login', async () => {
      const expectedMessage = "Welcome, Easton"
      const response = await request(server).post('/api/auth/login').send({ username: 'Easton', password: '1234' })

      expect(response.body.message).toEqual(expectedMessage)
    })
    it ('should respond with message "invalid credentials" on failed login', async () => {
      const expectedMessage = "invalid credentials"
      const response = await request(server).post('/api/auth/login').send({ username: 'Brodie', password: '1212' })

      expect(response.body.message).toEqual(expectedMessage)
    })
  })
  describe('jokes route', () => {
    it ('should respond with status 200 on successful access with token', async () => {
      const expectedStatusCode = 200
      const response = await request(server).post('/api/auth/login').send({ username: 'Easton', password: '1234' })
      const access = await request(server).get('/api/jokes').set('Authorization', response.body.token)

      expect(access.status).toEqual(expectedStatusCode)
    })
    it ('should respond with status 200 on successful access with token', async () => {
      const expectedStatusCode = 401
      const access = await request(server).get('/api/jokes')

      expect(access.status).toEqual(expectedStatusCode)
    })
  })
})