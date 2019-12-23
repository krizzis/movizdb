const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Cast = sequelize.define('cast', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    job: Sequelize.STRING,
    character: Sequelize.STRING
});

module.exports = Cast;