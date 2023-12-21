// const { Sequelize } = require('sequelize');
require('dotenv').config();
let mysql = require('mysql')

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;


const db = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName,
    port: dbPort,
    max: 20, // maximum number of connections in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // how long to wait for a connection to be established
});

db.getConnection((err, connection) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Connected");
    }
})

module.exports = db;



