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
      const response = (await request(server).post('api/auth/register')).send({ username: 'Ben', password: '9999' })

      expect(response.status).toEqual(expectedStatusCode)
    })
  })
})