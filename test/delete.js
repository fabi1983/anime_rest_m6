const chai = require('chai')
const chaiHttp = require('chai-http');
const { servidor } = require('../index');

chai.use(chaiHttp);

describe('Probando respuesta de servidor para metodo DELETE /anime' , () => {
    it('Comprueba que metodo DELETE responde con codigo 200', (done) => {

        // /anime/:id     se obtiene una vez generado con uuid, solo se envia por parametro el id a eliminar
        chai.request(servidor).delete('/anime/e376') 
        .end((error, respuesta) => {
            chai.expect(respuesta).to.have.status(200);
            done();
        })
    })
})
