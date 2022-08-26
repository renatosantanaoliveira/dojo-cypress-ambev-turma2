/// <reference types ="cypress" />

describe('Funcionalidade: Login via API', () => {
    it('Deve fazer o login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            body: {
                "email": "renatosantana@dojo.com.br",
                "password": "senha@54321"
              }
        }).should((response) => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('jwt')
            expect(response.duration).be.greaterThan(200)
        })
    })
});