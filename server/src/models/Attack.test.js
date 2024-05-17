const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack } = require('.')
const {db} = require('../db/config.js')

// define in global scope
let attack

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  attack = await Attack.create({ title: 'Lightning Breath', mojoCost: 3, staminaCost: 5,})
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Attack', () => {
  it('has an id', async () => {
    expect(attack).toHaveProperty('id')
  })

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */

  it(`has correct title`, () => {
    expect(attack.title).toBe(`Lightning Breath`)
  })

  it(`has correct mojo cost`, () => {
    expect(attack.mojoCost).toBe(3)
  })

  it(`has correct stamina cost`, () => {
    expect(attack.staminaCost).toBe(5)
  })
})