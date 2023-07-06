const express = require ("express")
const app = express()
const fs = require('fs/promises')

const PORT = 3000

// leer animes
app.get('/anime', async( req, res ) => {
    const lecturaArchivo = await fs.readFile('anime.json')
    res.send(lecturaArchivo);
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



app.listen(PORT, ()=>{
    console.log("server on port:", PORT)
})