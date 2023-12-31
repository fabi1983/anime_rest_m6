const express = require ("express")
const app = express()
const fs = require('fs/promises')
const {v4: uuidv4 } = require('uuid')  

const PORT = 3000


app.use(express.json())

// leer animes
app.get('/anime', async( req, res ) => {
    try {
        const lecturaArchivo = await fs.readFile('anime.json')
        //res.send(lecturaArchivo)
        const objetoArchivoOriginal = JSON.parse(lecturaArchivo)
        
        res.send(objetoArchivoOriginal).sendStatus(200);
    } catch (error) {
        console.log("ocurrio un error al tratar de leer los animes")
    }
})

// leer 1 anime
app.get('/anime/:id', async( req, res ) => {
    try {
        const { id } = req.params
        //console.log(id)
        const lecturaArchivo = await fs.readFile('anime.json')
        const objetoArchivoOriginal = JSON.parse(lecturaArchivo)
        
        const animeOriginal = objetoArchivoOriginal[id]
        // console.log(animeOriginal)
        res.send(animeOriginal)
    } catch (error) {
        console.log("Ocurrio un error al tratar de leer un anime")
    }
})

app.post('/anime', async( req, res ) => {
    try {
        const lecturaArchivo = await fs.readFile('anime.json')
        const objetoArchivoOriginal = JSON.parse(lecturaArchivo)
        // console.log(objetoArchivoOriginal)
        
        const datosAnimeBody = req.body;
        
        const id = uuidv4().slice(0,4)
        
        objetoArchivoOriginal[id] = datosAnimeBody;  
        
        //console.log(objetoArchivoOriginal)
        
        await fs.writeFile('anime.json', JSON.stringify(objetoArchivoOriginal, null, 2))
        res.send('Se ha guardado exitosamente el nuevo anime').sendStatus(200);
        
    } catch (error) {
        console.log("No se pudo ingresar un Anime")
    }
})


// actualizar 1 anime
app.put('/anime/:id', async( req, res ) => {
    try {
        const { id } = req.params
        //console.log(id)
        const lecturaArchivo = await fs.readFile('anime.json')
        const objetoArchivoOriginal = JSON.parse(lecturaArchivo)
        
        const animeParaModificar = req.body;
        
        const animeOriginal = objetoArchivoOriginal[id]
        
        const animeActualizado = { ...animeOriginal, ...animeParaModificar }
        
        objetoArchivoOriginal[id] = animeActualizado
    
        await fs.writeFile('anime.json', JSON.stringify(objetoArchivoOriginal, null, 2));
        // console.log(animeOriginal)
        res.send(`Los datos del comics N°: ${id}, \n fueron actualizados exitosamente`).sendStatus(200)
        
    } catch (error) {
        console.log("No se pudo Actualizar el anime o no existe")
    }
})


app.delete('/anime/:id', async( req, res ) => {
    try {
        const { id } = req.params
        const animesOriginal = await fs.readFile('anime.json')
        const objetoAnimesOriginal = JSON.parse(animesOriginal);
        
        delete objetoAnimesOriginal[id]
        
        await fs.writeFile('anime.json', JSON.stringify(objetoAnimesOriginal, null, 2)) 
        
        res.send("El comic ha sido eliminado exitosamente").sendStatus(200)
        
    } catch (error) {
        console.log("No se pudo Eliminar el anime o no existe")
    }
})


app.get("*", (req, res) => {
    res.send("404, la ruta no existe.")
})

app.listen(PORT, ()=>{
    console.log("server on port:", PORT)
})

module.exports = { 
    servidor :app 
}   