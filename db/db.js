const Pool = require('pg').Pool

const pool = new Pool({
  user: 'nikashamiladze',
  password: 'none',
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
})

module.exports = pool
