const Sequielize = require('sequelize');
const sequelize = require('../data/database');

const User = sequelize.define('user', {
    id: {
        type: Sequielize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequielize.STRING,
        allowNull: false
    },
    password: {
        type: Sequielize.STRING,
        allowNull: false
    },    
    email: Sequielize.STRING,
    isAdmin: {
        type: Sequielize.TINYINT,
        defaultValue: 0
    }
});

module.exports = User;
