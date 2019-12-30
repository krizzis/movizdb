const Sequielize = require('sequelize');
const sequelize  = require('../data/database');

const Movie = sequelize.define('movie', {
    id: {
        type: Sequielize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequielize.STRING,
        allowNull: false
    },
    imageUrl: Sequielize.STRING,
    status: Sequielize.STRING,
    release_date: Sequielize.DATEONLY,
    language: Sequielize.STRING,
    duration: Sequielize.INTEGER,
    budget: Sequielize.INTEGER,
    revenue: Sequielize.INTEGER,
    slogan: Sequielize.TEXT,
    description: Sequielize.TEXT,
    rating: Sequielize.DOUBLE,
    homepage: Sequielize.STRING
});


module.exports = Movie;