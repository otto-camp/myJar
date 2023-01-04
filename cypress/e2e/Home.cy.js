/* eslint-disable no-undef */
describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('poster rendered for non-login users', () => {
        cy.get('[data-cy="home-title"]').should('have.text', 'Create your own stories');
        cy.get('[data-cy="home-text"]').should('have.text', 'myJar is a storytelling website that gives you the freedom to explore your creativity and tell your story! We are a community where writers of all levels come to express themselves as they find inspiration and share their stories.');
        cy.get('[data-cy="home-create-post-button"]').should('not.exist');
        cy.get('[data-cy="home-login-button"]').should('exist');

        cy.get('[data-cy="home-category-grid"]').should('be.visible');
        cy.get('[data-cy="home-category-link"]').should('be.visible');

        cy.get('[data-cy="post-image"]').should('be.visible');
        cy.get('[data-cy="post-title"]').should('be.visible');
        cy.get('[data-cy="post-subtitle"]').should('be.visible');
    })

    it('create post button rendered for users', () => {
        cy.visit('/login');
        cy.get('[data-cy="login-email"]').type('qq@qq.com');
        cy.get('[data-cy="login-password"]').type('123456');
        cy.get('[data-cy="login-button"]').click().then(() => {
            cy.wait(800);

            cy.get('[data-cy="home-create-post-button"]').should('be.visible')
            cy.get('[data-cy="home-create-post-button"]').click();
            cy.location('href', '/create-post/')

        })
    })
})