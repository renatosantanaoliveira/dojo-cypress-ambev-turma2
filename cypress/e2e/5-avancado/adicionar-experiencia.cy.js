/// <reference types="cypress" />

import expePage from '../../support/pages/add-experiencia.page'

describe('Funcionalidade: Adicionar Experiência', () => {
    beforeEach(() =>{
        cy.fixture("usuario").then((user) => {
            cy.gerarToken(user.email, user.senha).then((tkn) => {
                cy.clearCookie('jwt')
                cy.setCookie('jwt', tkn)
            })
        })

        cy.visit('/adicionar-experiencia')
    })

    it('Deve adicionar a experiência com sucesso (Uso de Page Object)', () => {
        expePage.addExperiencia("QA", "Via", "Belo Horizonte", "01/12/2000", "12/12/2001", "Experiencia em QA")
        cy.contains('QA')
    });

    it('Deve adicionar a experiência com sucesso (Uso de Page Object)', () => {
        expePage.addExperienciaAtual("Tester", "Ambev", "Belo Horizonte", "01/12/2020", "Experiencia em QA")
        cy.contains('Tester')
    });

});