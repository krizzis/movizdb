const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Language = sequelize.define('language', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     primaryKey: true
    // },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING
});

module.exports = Language;