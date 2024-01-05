describe('Sign in user', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  })
  
  const emailInput = "[type=email]";
  const passwordInput = "[type=password]";

  it('Alerts user for invalid password length', () => {
    cy.get(emailInput).type("isthebusstillrunnin@walkthatduck.com");
    cy.get(passwordInput).type("2short{enter}");
    cy.get(`${passwordInput}:invalid`).should('have.length', 1)
  })

  it('Alerts user for invalid email', () => {
    cy.get(emailInput).type("notarealemail");
    cy.get(passwordInput).type("12345678{enter");
    cy.get(`${emailInput}:invalid`).should('have.length', 1);
  })

  it('Alerts user for empty password', () => {
    cy.get(emailInput).type("henny@walkthatduck.com");
    cy.get(`${passwordInput}:invalid`).should('have.length', 1)
  })

  it('Alerts user for empty email', () => {
    cy.get(passwordInput).type("12345678{enter");
    cy.get(`${emailInput}:invalid`).should('have.length', 1);
  })

  it('Alerts user for incorrect password', () => {
    cy.intercept("POST", "/auth/v1/token?grant_type=password", (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.equal(400);
      })
    })
    cy.get(emailInput).type("shangela@walkthatduck.com");
    cy.get(passwordInput).type("wrongpassword{enter}");
    cy.get("[data-testid=incorrect-password-error").should('exist').should("have.text", "Password is incorrect");

  })

  it("Succesfully signs in user", () => {
    cy.intercept("POST", "/auth/v1/token?grant_type=password", (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.equal(200);
      })
    })
    cy.get(emailInput).type("austin1052@gmail.com");
    cy.get(passwordInput).type("asdfghjkl{enter}");
    cy.url().should('equal', "http://localhost:3000/");
    cy.getCookie('sb-jdikfuzgprjqzalvjgsa-auth-token').should('exist');
  })

  // it("Succesfully signs out user", () => {
  //   cy.get("[data-testid=log-out-button").click();
  //   cy.intercept("POST", "/auth/v1/logout?scope=global").as("log-out");
  //   cy.wait("@log-out")
  //   cy.getCookie('sb-jdikfuzgprjqzalvjgsa-auth-token').should('not.exist');
  // })
})
