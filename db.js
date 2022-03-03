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

async function insertarRepertorio(cancion, artista, tono) {
    const client = await pool.connect()
  // ejemplo de consulta con 2 parámetros
    const res = await client.query(
        "insert into repertorio (cancion, artista, tono) values ($1, $2, $3) returning *",
        [cancion, artista, tono]
    )
    client.release()
}

async function editarRepertorio (id, cancion, artista, tono) {
    const client = await pool.connect()

    const res = await client.query({
        text: "update repertorio set cancion=$2, artista=$3, tono=$4 where id=$1",
        values: [id, cancion, artista, tono]
    })

    client.release()
    return res
}

async function eliminarRepertorio(id) {
    const client = await pool.connect()
    // ejemplo de consulta con 2 parámetros
    const res = await client.query(
        "delete from repertorio where id=$1",
        [id]
    )
    client.release()
}

module.exports = { getRepertorio, insertarRepertorio, editarRepertorio, eliminarRepertorio }