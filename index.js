const express = require ("express")
const app = express()
const fs = require('fs/promises')
const {v4: uuidv4 } = require('uuid')  

const PORT = 3000

// para usar req.body
app.use(express.json())

// leer animes
app.get('/anime', async( req, res ) => {
    const lecturaArchivo = await fs.readFile('anime.json')
    //res.send(lecturaArchivo)
    const objetoArchivoOriginal = JSON.parse(lecturaArchivo)
    
    res.send(objetoArchivoOriginal);
})

// leer 1 anime
app.get('/anime/:id', async( req, res ) => {
    const { id } = req.params
    //console.log(id)
    const lecturaArchivo = await fs.readFile('anime.json')
    const objetoArchivoOriginal = JSON.parse(lecturaArchivo)
    
    const animeOriginal = objetoArchivoOriginal[id]
    // console.log(animeOriginal)
    res.send(animeOriginal)
})

app.post('/anime', async( req, res ) => {
    const lecturaArchivo = await fs.readFile('anime.json')
    const objetoArchivoOriginal = JSON.parse(lecturaArchivo)
    // console.log(objetoArchivoOriginal)

    const datosAnimeBody = req.body;

    const id = uuidv4().slice(0,4)

    objetoArchivoOriginal[id] = datosAnimeBody;  

    //console.log(objetoArchivoOriginal)
    
    await fs.writeFile('anime.json', JSON.stringify(objetoArchivoOriginal, null, 2))
    res.send('Se ha guardado exitosamente el nuevo anime');
})




app.listen(PORT, ()=>{
    console.log("server on port:", PORT)
})