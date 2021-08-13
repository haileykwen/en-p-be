const mysql = require('mysql');

const db = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b89604baaf51fe',
    password: '1669ca71',
    database: 'heroku_c027d17965121cb'
})

module.exports = db;