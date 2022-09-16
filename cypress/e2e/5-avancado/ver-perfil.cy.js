/// <reference types="cypress" />

import mkPerfis from "../../fixtures/perfis.json"

describe('Funcionalidade: Ver perfis', () => {
    it('Deve validar o primeiro item da lista', () => {
        cy.fixture("perfis").then((mockPerfis) => {
            cy.intercept('GET', '**/profile', {
                statusCode: 200,
                body: mockPerfis
            }).as('getPerfis')

            cy.visit('/perfis')
            cy.get('[data-test="profile-name"]').first().should('have.text', mockPerfis[0].user.name)
        })

    });

    it('Deve validar o ultimo item da lista', () => {
            cy.intercept("GET", "api/profile", {
              statusCode: 200,
              body: mkPerfis,
            }).as("getPerfis");

            cy.visit('/perfis')
            cy.get('[data-test="profile-name"]')
              .last()
              .should("have.text", "Wedney Santos Silva");
    });

    it('Deve validar o terceiro item da lista', () => {
        cy.mockBack(mkPerfis)
        
        cy.get('[data-test="profile-name"]').eq(2).should('have.text', 'Thaís da Silva')
    });
});