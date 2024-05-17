const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const {db} = require('../db/config.js')
const {User, Deck, Card, Attack} = require(`.`);

beforeAll(async () => await db.sync({ force: true }))

afterAll(async () => await db.sync({ force: true }))

describe(`user and deck`, () => {
    it(`has a 121 assoc`, async () => {
        const user = await User.create({
            username: `Gandalf`
        })

        const deck = await Deck.create({
            name: `Niv Mizzet`,
            xp: 500,
        })

        await user.setDeck(deck);

        const associatedDeck = await user.getDeck();
        expect(associatedDeck.UserId).toBe(user.id);
    })
})

describe(`card and deck`, () => {
    it(`has a 12Many assoc`, async () => {
        const deck = await Deck.create({
            name: `Niv Mizzet`,
            xp: 500,
        })

        const card0 = await Card.create({
            name: `Niv Mizzet, Parun`,
            mojo: 6,
            stamina: 5,
            imgUrl: `https://m.media-amazon.com/images/I/41MB7pJ-CGL._AC_UF894,1000_QL80_.jpg`
        })

        const card1 = await Card.create({
            name: `The Locust God`,
            mojo: 6,
            stamina: 4,
            imgUrl: `https://cards.scryfall.io/normal/front/7/e/7e599847-8ab0-4fd6-b2c0-cb44a7669aa5.jpg?1682209825`
        })

        const card2 = await Card.create({
            name: `Laboratory Maniac`,
            mojo: 3,
            stamina: 2,
            imgUrl: `https://cards.scryfall.io/normal/front/6/0/608567fd-9f94-4058-831a-77cb6019ef02.jpg?1547516361`
        })

        await deck.addCards([card0, card1, card2]);

        const associatedCards = await deck.getCards([card0, card1, card2]);
        expect(associatedCards[0].name).toBe(`Niv Mizzet, Parun`);
        expect(associatedCards[1].name).toBe(`The Locust God`);
        expect(associatedCards[2].name).toBe(`Laboratory Maniac`);
    })
})

describe(`card and attack`, () => {
    it(`has many2many assoc`, async () => {
        const card0 = await Card.create({
            name: `Niv Mizzet, Parun`,
            mojo: 6,
            stamina: 5,
            imgUrl: `https://m.media-amazon.com/images/I/41MB7pJ-CGL._AC_UF894,1000_QL80_.jpg`
        })

        const card1 = await Card.create({
            name: `The Locust God`,
            mojo: 6,
            stamina: 4,
            imgUrl: `https://cards.scryfall.io/normal/front/7/e/7e599847-8ab0-4fd6-b2c0-cb44a7669aa5.jpg?1682209825`
        })

        const card2 = await Card.create({
            name: `Laboratory Maniac`,
            mojo: 3,
            stamina: 2,
            imgUrl: `https://cards.scryfall.io/normal/front/6/0/608567fd-9f94-4058-831a-77cb6019ef02.jpg?1547516361`
        })

        const attack0 = await Attack.create({
            title: `Lightning Breath`,
            mojoCost: 3,
            staminaCost: 5,
        })

        const attack1 = await Attack.create({
            title: `Locust Swarm`,
            mojoCost: 2,
            staminaCost: 3,
        })

        const attack3 = await Attack.create({
            title: `Alchemy Explosion`,
            mojoCost: 3,
            staminaCost: 4,
        })

        const attack4 = await Attack.create({
            title: `Swipe`,
            mojoCost: 1,
            staminaCost: 2,
        })

        const attack5 = await Attack.create({
            title: `Wail`,
            mojoCost: 1,
            staminaCost: 1,
        })

        const attack6 = await Attack.create({
            title: `Zap`,
            mojoCost: 0,
            staminaCost: 1,
        })

        await card0.addAttacks([attack0, attack4, attack6]);
        await card1.addAttacks([attack1, attack4, attack5]);
        await card2.addAttacks([attack3, attack5, attack6]);

        const card0Attacks = await card0.getAttacks();
        expect(card0Attacks[0].title).toBe(`Lightning Breath`);

        const card1Attacks = await card1.getAttacks();
        expect(card1Attacks[1].title).toBe(`Swipe`);

        const card2Attacks = await card2.getAttacks();
        expect(card2Attacks[2].title).toBe(`Zap`);

    })
})