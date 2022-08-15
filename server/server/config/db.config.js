// db should be here
const Sequelize = require('sequelize');

const sequelize = new Sequelize('scholarsys', 'root', '', {
	dialect: 'mysql',
	host: 'localhost'
});
module.exports = sequelize;
