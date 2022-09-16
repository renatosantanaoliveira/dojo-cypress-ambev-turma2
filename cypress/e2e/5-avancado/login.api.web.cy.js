/// <reference types="cypress" />

import user from '../../fixtures/usuario.json'

describe('Funcionalidade login Via API e acesso perfil', () => {
    beforeEach(() => {
        cy.gerarToken(user.email, user.senha).then((tkn) => {
            Cypress.env('token', tkn)
        })
    });

    it('Validar o uso com Cypress.env', () => {
        cy.log(Cypress.env('token'))
    });

    it('Acessar o perfil com login realizado via API', () => {
        cy.clearCookie('jwt')
        cy.setCookie('jwt', Cypress.env('token'))
        cy.setCookie('language', 'pt-br')

        cy.visit('/dashboard')
        cy.get('[data-layer="Content"]').should('contain','Bem vindo')
    })
});