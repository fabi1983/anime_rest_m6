const chai = require('chai')
const chaiHttp = require('chai-http');
const { servidor } = require('../index');

chai.use(chaiHttp);

describe('Probando respuesta de servidor para metodo POST /anime' , () => {
    it('Comprueba que metodo POST responde con codigo 200', (done) => {

        chai.request(servidor).post('/anime')
        .send({
            "nombre": "Slam dunk",
            "genero": "Comedia, Deportivo",
            "año": "1993",
            "autor": "Takehiko Inoue"
          })
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);

            done();
        
        })

    })
})
