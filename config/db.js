const mysql = require("mysql2");
require("dotenv").config();

/**
 * Establish a connection to the MySQL database using environment variables.
 *
 * The following environment variables are expected to be defined:
 * - `DB_HOST`: Hostname of the database server.
 * - `DB_USER`: Username for the database.
 * - `DB_PORT`: Port for the database connection (default is 3306).
 * - `DB_PASSWORD`: Password for the database user.
 * - `DB_NAME`: Name of the database to connect to.
 *
 * @module db
 */

const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database server hostname
  user: process.env.DB_USER, // Database username
  port: process.env.DB_PORT || 3306, // Database port (default: 3306)
  password: process.env.DB_PASSWORD, // Database user password
  database: process.env.DB_NAME, // Name of the database
});

/**
 * Connect to the MySQL database and log the connection status.
 * If the connection fails, an error message is displayed.
 */
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

module.exports = db;
