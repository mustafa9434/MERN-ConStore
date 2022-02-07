const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize('mern-learning', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => console.log('connected'))
    .catch(() => console.log('not connected'))

const db = {};
db.sequelize = sequelize;
db.sequelize.sync({force: false})
    .then(() => console.log('sync'))
    .catch(() => console.log('not synced'))

db.users = require('../models/Users')(sequelize, DataTypes)
db.contacts = require('../models/Contacts')(sequelize, DataTypes)

module.exports = db;