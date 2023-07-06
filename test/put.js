const chai = require('chai')
const chaiHttp = require('chai-http');
const { servidor } = require('../index');

chai.use(chaiHttp);

describe('Probando respuesta de servidor para metodo PUT /anime' , () => {
    it('Comprueba que metodo PUT responde con codigo 200', (done) => {

        chai.request(servidor).put('/anime/25c8 ') // se obtiene una vez generado con uuid
        .send({
            "nombre": "One Piece",
            "genero": "Fantasia",
            "año": "1997",
            "autor": "Eiichiro Oda"
        })
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);

            done();
        
        })

    })
})
