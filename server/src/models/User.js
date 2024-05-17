// create your User model here
const {DataTypes} = require(`sequelize`);
const {db} = require(`../db/config.js`);

const User = db.define(`User`, {
    username: DataTypes.STRING,
});

module.exports = {
    User,
};