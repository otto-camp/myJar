/* eslint-disable no-undef */
describe('Login Page', () => {
    it("logs in with valid credentials", () => {
        cy.visit('/login')
        cy.get('#mantine-r1').type('qq@qq.com');
        cy.get('#mantine-r3').type('123456');
        cy.get('form > .mantine-Button-root').click();
        cy.get('button > div > span').should('have.text','Sign Out').click();
    })
})