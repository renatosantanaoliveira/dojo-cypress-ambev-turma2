// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, senha) => {
  cy.visit('/login')
  cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email);
  cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(senha);
  cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("loginRapido", () => {
    cy.fixture("usuario").then((user) => {
        cy.login(user.email, user.senha)
    })
})

Cypress.Commands.add("gerarToken", (email, senha) => {
  cy.request({
    method: 'POST',
    url: '/api/auth',
    body: {
        "email": email,
        "password": senha
      }
    }).then((response) => {
        return response.body.jwt
    })
})


Cypress.Commands.add('cadastrarExperiencia', (token, cargo, empresa, data) => {
  cy.request({
    method: 'PUT',
    url: 'api/profile/experience',
    headers: {
        Cookie: token
    },
    body: {
        title: cargo,
        company: empresa,
        from: data
    }
  }).then((response) => {
    return response.body.experience[0]._id
  })
})

Cypress.Commands.add('mockBack', (body) => {
  cy.intercept("GET", "api/profile", {
    statusCode: 200,
    body: body,
  }).as("getPerfis");

  cy.visit('/perfis')
})