const Sequelize = require('sequelize');

// Prod
// const sequelize = new Sequelize(
//     '5IU45193DS',
//     '5IU45193DS',
//     'ZbDgPUdcA0',
//     {
//         dialect: 'mysql',
//         host: 'remotemysql.com'
//         ,logging: false
//     });

// LOCAL
const sequelize = new Sequelize(
    'datamoviz',
    'root',
    'EXua8ups1',
    {
        dialect: 'mysql',
        host: 'localhost'
        ,logging: false
    });    


module.exports = sequelize;
