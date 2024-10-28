const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clubhub_userauth',
  password: 'passw0rd',
  port: 5432,
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}