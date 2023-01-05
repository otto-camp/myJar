/* eslint-disable no-undef */
import post from '../fixtures/post.json'
import user from '../fixtures/user.json'
describe('Post Page', () => {
    beforeEach(() => {
        cy.visit('/post/9WbNEayqvB7iQNRxb4HG')
    })

    it('renders the post and user data', () => {
        cy.get('[data-cy="post-title"]').should('have.text', post.postTitle);
        cy.get('[data-cy="post-subtitle"]').should('have.text', post.postSubTitle);
        cy.get('[data-cy="post-image"]').should('be.visible');
        cy.get('[data-cy="post-text"]>*').should('exist')
        cy.get('[data-cy="post-creater-name"]').should('have.text', `${user.fname} ${user.lname}`);
    });

    it('navigates to the user profile when the user avatar is clicked', () => {
        cy.get('[data-cy="post-creater-image"]>img').click();
        cy.url().should('include', '/profile/' + user.id);
    })

});
