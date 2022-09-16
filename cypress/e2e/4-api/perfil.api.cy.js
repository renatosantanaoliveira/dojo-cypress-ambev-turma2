/// <reference types="cypress" />

import user from '../../fixtures/usuario.json'

describe('Funcionalidade Perfil via API', () => {
    let token
    
    beforeEach(() => {
        cy.gerarToken(user.email, user.senha).then((tkn) => {
            token = tkn
        })
    });

    it('[GET] Deve consultar o perfil do usuário, usando token dinâmico', () => {
        cy.request({
            method: 'GET',
            url: 'api/profile/me',
            headers: {
                Cookie: token
            }
        }).its('body').then((response) => {
            expect(response.company).to.equal('Via')
            expect(response.bio).to.contain('Olá, sou o Renato Santana')
            expect(response.skills[1]).to.equal('NodeJS')
        })
    });

    it.only('[PUT] Deve adicionar experiência profissional do usuário', () => {
        cy.request({
            method: 'PUT',
            url: 'api/profile/experience',
            headers: {
                Cookie: token
            },
            body: {
                title: 'QA Especialista',
                "company": "Via",
                from: "2022-09-08"
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.experience[0].title).to.equal('QA Especialista');
            expect(response.body.experience[0].company).to.equal('Via');
        })
    });

    it('[Delete], Deve deletar a experiencia profissional do usuário', () => {
        const body = {
          title: "QA Especialista",
          company: "Via",
          from: "2022-09-08",
        };

        cy.cadastrarExperiencia(token, body.title, body.company, body.from).then((id) => {
            cy.request({
                method: 'DELETE',
                url: `api/profile/experience/${id}`,
                headers: { 
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).equal(200);
                expect(response.body.experience).to.empty
            })
        })

    });

});