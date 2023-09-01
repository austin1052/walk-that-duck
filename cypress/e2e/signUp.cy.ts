describe('Sign up user', () => {

  const emailInput = "[name=email]"
  const passwordInput = "[name=password]"
  const nameInput = "[name=name]"
  const loginButton ="[data-testid=log-in-button]"
  const switchViewButton = "[data-testid=switch-view-button]"

  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get(switchViewButton).click()
  })

  it("Toggles between sign in and sign up forms", () => {
    cy.get(nameInput).should("exist")
    cy.get(switchViewButton).click()
    cy.get(nameInput).should("not.exist")
    cy.get(switchViewButton).click()
    cy.get(nameInput).should("exist")
  })

  it('Alerts user for invalid password length', () => {
    cy.get(emailInput).type("shedonealreadydid@hadhers.com")
    cy.get(passwordInput).type("2short")
    cy.get(nameInput).type("Katya")
    cy.get(loginButton).click()
    cy.get(`${passwordInput}:invalid`).should('have.length', 1)
    cy.get(passwordInput).blur()
    cy.get("[data-testid=invalid-password-error").should('be.visible').should("have.text", "Password must be 8 characters")
  })

  it('Alerts user for invalid email format', () => {
    cy.get(emailInput).type("notarealemail")
    cy.get(passwordInput).type("12345678")
    cy.get(nameInput).type("Michelle Visage")
    cy.get(loginButton).click()
    cy.get(`${emailInput}:invalid`).should('have.length', 1)
    cy.get(emailInput).blur()
    cy.get("[data-testid=invalid-email-error").should('be.visible').should("have.text", "Enter a valid email")
  })

  it('Alerts user for empty email', () => {
    cy.get(passwordInput).type("12345678")
    cy.get(nameInput).type("Trixie Mattel")
    cy.get(loginButton).click()
    cy.get(`${emailInput}:invalid`).should('have.length', 1)
  })

  it('Alerts user for empty password', () => {
    cy.get(emailInput).type("deathdropprincess@walkthatduck.com")
    cy.get(nameInput).type("Michelle Visage")
    cy.get(`${passwordInput}:invalid`).should('have.length', 1)
  })

  it('Alerts user for empty name', () => {
    cy.get(emailInput).type("hotdog@walkthatduck.com")
    cy.get(passwordInput).type("12345678")
    cy.get(loginButton).click()
    cy.get(`${nameInput}:invalid`).should('have.length', 1)
  })

  it('Successfully signs up user', () => {
    cy.intercept("POST", "signup?redirect_to=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback", (req) => {
      req.on('response', (res) => {
        expect(res.statusCode).to.equal(200)
      })
    }).as("sign-up")
    
    cy.get(emailInput).type("testaccount@walkthatduck.com")
    cy.get(passwordInput).type("mypassword")
    cy.get(nameInput).type("Mistress Isabel Brooks")
    cy.get(loginButton).click()
    cy.wait("@sign-up").then(() => {
      cy.get("[data-testid=check-email").should("exist")
    })
  })

  // it("Succesfully signs out user", () => {
  //   cy.get("[data-testid=log-out-button").click()
  //   cy.intercept("POST", "/auth/v1/logout?scope=global").as("log-out")
  //   cy.wait("@log-out")
  //   cy.getCookie('sb-jdikfuzgprjqzalvjgsa-auth-token').should('not.exist')
  // })


})