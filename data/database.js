const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    '5IU45193DS',
    '5IU45193DS',
    'ZbDgPUdcA0',
    {
        dialect: 'mysql',
        host: 'remotemysql.com'
        ,logging: false
    });

module.exports = sequelize;
