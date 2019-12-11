const Sequelize = require('sequelize');
const sequelize = require('../data/database');

const FavoriteItem = sequelize.define('favoriteItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = FavoriteItem;