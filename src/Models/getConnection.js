const mysql    = require('mysql2/promise');
const dbConfig = require('./../Config/db.config')

let connection

async function dbConnection() {
    if (!connection) {
        try {
            connection = await mysql.createConnection({
                host: dbConfig.HOST,
                user: dbConfig.USER,
                password: dbConfig.PASSWORD,
                database: dbConfig.DATABASE
            });

            console.log(' Connection created ');
        } catch (error) {
            console.error(' Error in creating db connection ', error)
            throw error
        }
    }
    return connection
}

module.exports = dbConnection