/// <reference types ="cypress" />

describe('Funcionalidade: Login via API', () => {
    it('Deve fazer o login com sucesso', { tags: '@api' }, () => {
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

    it.only('Validar autenticacao do usuário', () => {
        cy.fixture("usuario").then((user) => {
            const token = cy.gerarToken(user.email, user.senha)

            cy.request({
                method: 'GET',
                url: '/api/auth',
                headers: {
                    accept: 'application/json',
                    cookie: token
                }
            }).should((response) => {
                expect(response.body.email).to.equal(user.email)
                expect(response.body.name).to.equal(user.nome)
                expect(response.body.date).not.empty
            })
        })
    })
});