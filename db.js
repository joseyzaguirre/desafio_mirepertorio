const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'repertorio',
    password: '1234',
    max: 20,
    min: 2,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

async function getRepertorio() {
    const client = await pool.connect()
    const res = await client.query(
        "select * from repertorio"
    )
    client.release()
    return res.rows
}

module.exports = { getRepertorio }