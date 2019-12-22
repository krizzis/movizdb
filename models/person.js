const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const Person = sequelize.define('person', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullname: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    birthday: Sequelize.DATEONLY,
    birthplace: Sequelize.STRING,
    deathday: Sequelize.DATEONLY,
    gender: Sequelize.STRING,
    description: Sequelize.TEXT,
    role: Sequelize.STRING,
    homepage: Sequelize.STRING
});

module.exports = Person;