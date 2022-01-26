describe('Fetch Rewards User flows', () => {

  beforeEach(() => {
    cy.interceptGetData()
    cy.visit('http://localhost:3000/')
  })

  it('Should have a homepage URL', () => {
    cy.url('http://localhost:3000/')
  })

  it('Should display a logo and a form', () => {
    cy.get('.app-logo').should('exist')
    cy.get('.main-form').should('exist')
  })
})