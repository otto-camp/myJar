/* eslint-disable no-undef */
describe('Login Page', () => {
    it("logs in with valid credentials", () => {
        cy.visit('/login')
        cy.get('[data-cy="login-email"]').type('qq@qq.com');
        cy.get('[data-cy="login-password"]').type('123456');
        cy.get('[data-cy="login-button"]').click();
        cy.get('button > div > span').should('have.text','Sign Out').click();
    })
})