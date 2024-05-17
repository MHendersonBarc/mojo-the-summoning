const {db, DataTypes} = require(`./db/config.js`);

const Deck = db.define(`Deck`, {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    xp: DataTypes.INTEGER,
});

module.exports = {
    Deck,
};