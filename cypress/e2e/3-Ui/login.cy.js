/// <reference types ="cypress" />

describe('Funcionalidade: Login', () => {
    beforeEach(() => {
        cy.visit('/login')
    });
    it.skip('Deve fazer o login com sucesso', () => {
        cy.fixture('login').then((user) => {
            cy.login(user.email, user.senha)
            cy.get('[data-test="dashboard-welcome"]').should('contain', `Bem-vindo ${user.nome}`)
        })
    });

    it('Deve realizar o login sem sucesso', () => {
        cy.login('emailinvalido@gmail.com', 'senha@invalida')
        cy.get('[data-test="alert"]').should('be.visible').and('contain', 'Credenciais inválidas')
    })
});


//npx cypress open -> abre o executor de testes do Cypress para que possa ser executado o cenários um a um
//npx cypress run -> executa toda a sua suíte de teste implementada no projeto (pasta e2e)