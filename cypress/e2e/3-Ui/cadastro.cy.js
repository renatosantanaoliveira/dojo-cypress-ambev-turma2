/// <reference types ="cypress" />

const faker = require('faker-br')

context.only('Cadastro', () => {
    beforeEach(() => {
        cy.visit('/cadastrar')
    });

    afterEach(() => {
        cy.screenshot()
    });

    const name = faker.name.firstName() + faker.name.lastName()
    const email = faker.internet.email(name)

    it('Cadastro com sucesso', () => {

        cy.log('entrou no cenário')
        
        cy.get('.large').should('exist').and('contain', 'Cadastrar')

        cy.get('[data-test="register-name"]').type(name)
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')
        cy.get('[data-test="register-submit"]').click()

        cy.wait(1000)
        cy.get('[data-test="dashboard-welcome"]').should('be.visible')

    })

    it('Devo validar mensagem quando cadastrar com o e-mail repetido', () => {
        cy.get('[data-test="register-name"]').type('Renato Santana')
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type('renatosantana05@dojo.com.br')
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('senha@54321')
        cy.get('[data-test="register-submit"]').click()

        cy.get('[data-test="alert"]').should('contain', 'Usuário já registrado')
    })
})


/*
funcionalidade de cadastro

Cenário: Cadastro com sucesso:
    Dado que eu esteja na tela de cadastro
    Quando eu preencho os campos obrigatórios
    Entao deve direcionar para o dashboard

Cenário: Cadastro sem suceso
*/

/*
    hoohks
    Before (acao executada antes de todos os cenários)
    visit
    acesso ao banco
    login
    input de dados

    Before each (acao que ocorre antes de cada teste)
    visit

    After (acao que ocorre somente no final cenário)
    fechar a conexao de banco de dados

    After each ()
    gerar um evidência
*/