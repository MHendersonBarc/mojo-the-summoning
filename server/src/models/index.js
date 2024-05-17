const { User } = require('./User')
const { Deck } = require('./Deck')
const { Card } = require('./Card')
const { Attack } = require('./Attack')

// set up the associations here
User.hasOne(Deck);
Deck.belongsTo(User);

Deck.hasMany(Card);
Card.belongsTo(Deck);

Card.belongsToMany(Attack, {through: `Card_Attacks`});
Attack.belongsToMany(Card, {through: `Card_Attacks`});

// and then export them all below
module.exports = { 
    User,
    Deck,
    Card,
    Attack,
};
