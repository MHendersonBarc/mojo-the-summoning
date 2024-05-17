const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('.')
const {db} = require('../db/config.js')

// define in global scope
let deck

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  deck = await Deck.create({ name: 'Niv Mizzet', xp: 500,})
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Deck', () => {
  it('has an id', async () => {
    expect(deck).toHaveProperty('id')
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */

  it(`has correct name`, () => {
    expect(deck.name).toBe(`Niv Mizzet`)
  })

  it(`has correct xp`, () => {
    expect(deck.xp).toBe(500)
  })
})