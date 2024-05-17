// create your User model here
const {db, DataTypes} = require(`./db/config.js`);

const User = db.define(`User`, {
    id: DataTypes.INTEGER,
    username: DataTypes.STRING,
});

module.exports = {
    User,
};