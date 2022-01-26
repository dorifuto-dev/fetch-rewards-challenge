Cypress.Commands.add('interceptGetData', () => {
  cy.intercept('GET', 'https://frontend-take-home.fetchrewards.com/form', { fixture: 'formData.json' })
})

Cypress.Commands.add('fillForm', () => {
  cy.get('.name-input')
    .type('Eric Li')
  cy.get('.email-input')
    .type('samplemail@sample.org')
  cy.get('.password-input')
    .type('123456789')
  cy.get('.occupation-select')
    .select(2)
  cy.get('.location-select')
    .select(4)
  cy.get('.submit-button')
    .click()
})

Cypress.Commands.add('fillIncompleteForm', () => {
  cy.get('.name-input')
    .type('Eric Li')
  cy.get('.email-input')
    .type('samplemail@sample.org')
  cy.get('.password-input')
    .type('123456789')
  cy.get('.submit-button')
    .click()
})

Cypress.Commands.add('interceptHappySubmit', () => {
  cy.intercept('POST', 'https://frontend-take-home.fetchrewards.com/form', {
    statusCode: 200,
    body: {
      name: 'Eric Li',
      email: 'samplemail@sample.org',
      password: '123456789',
      occupation: 'Interim Substitute Teacher',
      state: 'AR'
    }
  })
})

Cypress.Commands.add('interceptSadSubmit', () => {
  cy.intercept({
    method: 'POST',
    url: 'https://frontend-take-home.fetchrewards.com/form'
  },
  {
    statusCode: 500,
    body: {
      message: '500 Server timed out.'
    }
  })
})