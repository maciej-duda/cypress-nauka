import { testURL, addCartButton, cartIcon, checkoutButton, firstNameInput, lastNameInput, postalCodeInput, continueCheckoutButton, errorMessage, finishCheckoutButton } from "./variables/cartCheckoutVariables";

describe('Cart and checkout test', () => {
    before(() => {
        cy.visit(testURL)
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Add an item to the cart', () => {
        cy
        .get(addCartButton)
        .click()
    })

    it('Open the cart and click click at checkout', () => {
        cy
        .get(cartIcon)
        .click()
        cy
        .location('pathname')
        .should('eq', '/cart.html')
        cy
        .get(checkoutButton)
        .click()
    })

    it('Try to send empty checkout form', () => {
        cy
        .get(continueCheckoutButton)
        .contains("CONTINUE")
        .click()
        cy
        .get(errorMessage)
        .contains("First Name is required")
    })

    it('Try to send form with First Name only', () => {
        cy
        .get(firstNameInput)
        .type("Tester")
        cy
        .get(continueCheckoutButton)
        .contains("CONTINUE")
        .click()
        cy
        .get(errorMessage)
        .contains("Last Name is required")
    })

    it('Try to send form with the empty Zip/Postal Code field', () => {
        cy
        .get(lastNameInput)
        .type("Testowy")
        cy
        .get(continueCheckoutButton)
        .contains("CONTINUE")
        .click()
        cy
        .get(errorMessage)
        .contains("Postal Code is required")
    })

    it('Send properly filled form', () => {
        cy
        .get(postalCodeInput)
        .type("50-420")
        cy
        .get(continueCheckoutButton)
        .contains("CONTINUE")
        .click()
        cy
        .location('pathname')
        .should('eq', '/checkout-step-two.html')
    })

    it('Finish the checkout', () => {
        cy
        .get(finishCheckoutButton)
        .contains("FINISH")
        .click()
        cy
        .location('pathname')
        .should('eq', '/checkout-complete.html')
    })
})