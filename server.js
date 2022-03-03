const express = require('express')
const { getRepertorio } = require('./db.js')

const app = express()
app.use(express.static('static'))

app.get('/canciones', async (req, res) => {
    const canciones = await getRepertorio();
    res.send({ repertorio: canciones})
});


app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'))