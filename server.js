const express = require('express')
const { getRepertorio, insertarRepertorio, editarRepertorio, eliminarRepertorio } = require('./db.js')

const app = express()
app.use(express.static('static'))

app.get('/canciones', async (req, res) => {
    const canciones = await getRepertorio();
    res.send(canciones)
});

app.post('/cancion', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async () => {

        const datos = Object.values(JSON.parse(body));

        const nuevoRep = await insertarRepertorio(datos[0], datos[1], datos[2])
        //console.log(datos)
        res.status(201)
        res.send(nuevoRep)
    })
})

app.put('/cancion', async (req, res) => {
    let body = ""

    req.on("data", (data) => {
        body += data
    })

    req.on("end", async () => {

        const datos = Object.values(JSON.parse(body));

        await editarRepertorio(datos[0], datos[1], datos[2], datos[3])
        console.log(datos)
        res.send(datos)
    })
})

app.delete('/cancion', async (req, res) => {
    await eliminarRepertorio(req.query.id)
    res.send('repertorio eliminado de manera exitosa')
});


app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))