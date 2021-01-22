import { testURL, filterDropdown, inventoryItem, lastItemName, productNameURL } from "./variables/02-itemsPageVariables";

describe('Item page tests', () => {
    beforeEach(() => {
        cy.visit(testURL)
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('Check if default sorting is set to the "Name (A to Z)"', () => {
        cy
        .get(filterDropdown)
        .should('contain.text', 'Name (A to Z)')  
    })

    it('Change the sorting from the "Name (A to Z)" to the "Name (Z to A)"', () => {
        cy
        .get(filterDropdown)
        .select('za')
        cy
        .get(filterDropdown)
        .should('contain.text', 'Name (Z to A)')  
        cy
        .get(inventoryItem)
        .eq(0)
        .should('contain.text', lastItemName)
    })

    it('Open the item details page', () => {
        cy
        .get(productNameURL)
        .click();
        cy.contains('ADD TO CART')
    })
})