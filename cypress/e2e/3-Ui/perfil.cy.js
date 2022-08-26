/// <reference types ="cypress" />

describe('', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.loginRapido()
        cy.get('[data-test="dashboard-createProfile"]').click()
    });

    it('Deve cadastrar o perfil com sucesso', () => {
        cy.get('#mui-component-select-status').click()
        // cy.get('.MuiList-root').find('[data-value="Especialista em QA"]').click()
        // cy.contains('Especialista em QA').click()
        cy.get('.MuiList-root').contains('Especialista em QA').click()
    });

    it('Criar perfil com comando personalizados', () => {
        
    });

    it('Deve validar mensagem de erro ao cadastrar com site errado', () => {
        
    })
    
});