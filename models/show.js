const Sequielize = require('sequelize');
const sequelize  = require('../data/database');

const Show = sequelize.define('show', {
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
    year_started: Sequielize.INTEGER,
    year_finished: Sequielize.INTEGER,
    seasons: Sequielize.INTEGER,
    episodes: Sequielize.INTEGER,
    language: Sequielize.STRING,
    runtime: Sequielize.INTEGER,
    description: Sequielize.TEXT,
    rating: Sequielize.DOUBLE,
    homepage: Sequielize.STRING
});

module.exports = Show;