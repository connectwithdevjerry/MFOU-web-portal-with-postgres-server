const { Pool } = require('pg');
const mysql = require("mysql2");
require("dotenv").config();

const mycon = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 3306,
  max: 20, // Max connections
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Fail if connection takes >2s
});

async function queryWithPool() {
  try {
    const res = await mycon.query('SELECT * FROM blocks WHERE id = $1', [1]);
    console.log('blocks-1:', res.rows[0]);
  } catch (err) {
    console.error('Error:', err);
  }
}

queryWithPool();

module.exports = mycon;
