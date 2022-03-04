const express = require('express')
const { getRepertorio, insertarRepertorio, editarRepertorio, eliminarRepertorio } = require('./db.js')

const app = express()
app.use(express.static('static'))

app.get('/canciones', async (req, res) => {

    try {
        const canciones = await getRepertorio();
        res.send(canciones)
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

app.post('/cancion', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async () => {

        const datos = Object.values(JSON.parse(body));
        try {
            const nuevoRep = await insertarRepertorio(datos[0], datos[1], datos[2])
            res.status(201)
            res.send(nuevoRep)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    })
})

app.put('/cancion', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async () => {
        const datos = Object.values(JSON.parse(body));
        try {
            await editarRepertorio(datos[0], datos[1], datos[2], datos[3])
        } catch (error) {
            return res.status(400).send(error.message)
        }
        res.send(datos)
    })
})

app.delete('/cancion', async (req, res) => {
    try {
        await eliminarRepertorio(req.query.id)
    } catch(error) {
        return res.status(400).send(error.message)
    }
    res.send('repertorio eliminado de manera exitosa')
});


app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))