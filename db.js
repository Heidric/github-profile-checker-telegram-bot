const path = require('path');
const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const user = sequelize['import'](path.join(__dirname, 'models/user'));

sequelize.sync();

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = user;

module.exports = db;
