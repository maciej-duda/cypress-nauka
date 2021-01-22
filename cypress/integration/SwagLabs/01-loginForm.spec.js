import { testURL, loginButton, errorMessage, usernameField, passwordField} from "./variables/01-loginFormVariables";

describe('Login form check', () => {
    beforeEach(() => {
        cy.visit(testURL)
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Try to login with empty form', () => {
        cy
        .get(loginButton)
        .click()
        cy
        .get(errorMessage)
        .contains("Username is required")
    })

    it('Try to login with empty password', () => {
        cy
        .get(usernameField)
        .type('standard_user')
        cy
        .get(loginButton)
        .click()
        cy
        .get(errorMessage)
        .contains("Password is required")
    })

    it('Try to login with wrong credentials', () => {
        cy
        .get(usernameField)
        .type('standard_user')
        cy
        .get(passwordField)
        .type('something_wrong')
        cy
        .get(loginButton)
        .click()
        cy
        .get(errorMessage)
        .contains("Username and password do not match any user in this service")
    })

    it('Try to login with correct credentials', () => {
        cy
        .get(usernameField)
        .type('standard_user')
        cy
        .get(passwordField)
        .type('secret_sauce')
        cy
        .get(loginButton)
        .click()
        cy
        .location('pathname')
        .should('eq', '/inventory.html')
    })
  })