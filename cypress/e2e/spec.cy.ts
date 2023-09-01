describe('template spec', () => {
  // it('passes', () => {
  //   cy.visit('http://localhost:3000/login')
  // })

  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/login')
  })

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const email = 'austin1052@gmail.com'



    cy.get("[type=email]")
    .type("austin1052@gmail.com");

    cy.get("[type=password]")
    .type("12345678");

    cy.get("[data-testid=login-button]").click()

    // cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // Now that we've typed our new item, let's check that it actually was added to the list.
    // Since it's the newest item, it should exist as the last element in the list.
    // In addition, with the two default items, we should have a total of 3 elements in the list.
    // Since assertions yield the element that was asserted on,
    // we can chain both of these assertions together into a single statement.
    // cy.get('.todo-list li')
    //   .should('have.length', 3)
    //   .last()
    //   .should('have.text', newItem)
  })
})