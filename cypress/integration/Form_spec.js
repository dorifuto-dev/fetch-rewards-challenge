describe('Fetch Rewards Form User flows', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://frontend-take-home.fetchrewards.com/form', { fixture: 'formData.json' })
    cy.visit('http://localhost:3000/')
  })

  it('Should have a title and labels for user inputs', () => {
    cy.get('.form-title')
      .contains('New User Signup')
    cy.get('.name-label')
      .contains('Full Name')
    cy.get('.email-label')
      .contains('Email')
    cy.get('.password-label')
      .contains('Password')
    cy.get('.occupation-label')
      .contains('Occupation')
    cy.get('.location-label')
      .contains('Location')
    cy.get('.submit-button')
      .contains('Submit')
  })

  it('Should have Joseph Christ placeholders for user inputs', () => {
    cy.get('.name-input')
      .invoke('attr', 'placeholder')
        .should('contain', 'Joseph Christ')
    cy.get('.email-input')
      .invoke('attr', 'placeholder')
        .should('contain', 'josephchrist@nazareth.com')
    cy.get('.password-input')
      .invoke('attr', 'placeholder')
        .should('contain', 'Password')
    cy.get('.occupation-select > :nth-child(1)')
      .should('contain', 'Carpenter')
    cy.get('.occupation-select > :nth-child(2)')
      .should('contain', 'Head of Shrubbery')
    cy.get('.location-select > :nth-child(1)')
      .should('contain', 'Nazareth')
  })

  it('Should display a success message on successful completion of the form', () => {
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
    cy.get('.notification')
      .should('contain', 'Successfully signed up. Welcome to Fetch Rewards!')
  })

  // SAD PATH TESTING

  it('Should display a notification if a user fails to fill out the form completely', () => {
    cy.get('.name-input')
      .type('Eric Li')
    cy.get('.email-input')
      .type('samplemail@sample.org')
    cy.get('.password-input')
      .type('123456789')
    cy.get('.submit-button')
      .click()
    cy.get('.notification')
      .should('contain', 'Please fill out all fields before submitting the form.')
  })

  it('Should display notification of a server error upon submission of the form', () => {
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
    cy.get('.notification')
      .should('contain', 'Something went wrong. Please try submitting the form again.')
  })
})