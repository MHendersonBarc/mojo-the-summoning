const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('.')
const {db} = require('../db/config.js')

// define in global scope
let card

// clear db and create new user before tests
beforeAll(async () => {
  await db.sync({ force: true })
  card = await Card.create({ name: 'Niv Mizzet', mojo: 6, stamina: 5, imgUrl: `https://m.media-amazon.com/images/I/41MB7pJ-CGL._AC_UF894,1000_QL80_.jpg`,})
})

// clear db after tests
afterAll(async () => await db.sync({ force: true }))

describe('Card', () => {
  it('has an id', async () => {
    expect(card).toHaveProperty('id')
  });

  /**
   * Create more tests
   * E.g. check that the username of the created user is actually gandalf
   */

  it(`has correct name`, () => {
    expect(card.name).toBe(`Niv Mizzet`)
  });

  it(`has correct mojo`, () => {
    expect(card.mojo).toBe(6)
  });

  it(`has correct stamina`, () => {
    expect(card.stamina).toBe(5)
  });

  it(`has correct image`, () => {
    expect(card.imgUrl).toBe(`https://m.media-amazon.com/images/I/41MB7pJ-CGL._AC_UF894,1000_QL80_.jpg`)
  });
})