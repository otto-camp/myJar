import user from '../fixtures/user.json'
import post from '../fixtures/post.json'
/* eslint-disable no-undef */
describe('Profile Page', () => {
    beforeEach(() => {
        cy.visit('/profile/U4CXI7PCE4dN1x2snku05kJpF7G2');
    });

    it('renders the profile for non-login users', () => {
        cy.get('[data-cy="image"]>img').should('have.attr', 'src', user.photoUrl);
        cy.get('[data-cy="username"]').should('have.text', `${user.fname} ${user.lname}`);
        cy.get('[data-cy="about"]').should('have.text', user.about);
        cy.get('[data-cy="email"]').should('have.text', user.email);
        cy.get('[data-cy="birth-date"]').should('have.text', user.birthDate);

    })

    it('renders the social section for non-login users', () => {
        cy.get('[data-cy="website"]').should('have.text', user.website);
        cy.get('[data-cy="github"]').should('have.text', user.github);
        cy.get('[data-cy="twitter"]').should('have.text', user.twitter);
        cy.get('[data-cy="facebook"]').should('have.text', user.facebook);
        cy.get('[data-cy="instagram"]').should('have.text', user.instagram);
    })

    it('renders the posts section for non-login users', () => {
        cy.get('[data-cy="simple-post-card"]').then(() => {
            cy.get('[data-cy="title"]').should('have.text', post.postTitle);
            cy.get('[data-cy="date"]').should('have.text', post.timestamp.seconds);
            cy.get('[data-cy="sub-title"]').should('have.text', post.postSubTitle);
        })
    })
})