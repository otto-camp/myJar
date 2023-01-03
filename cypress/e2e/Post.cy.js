/* eslint-disable no-undef */
import post from '../fixtures/post.json'
describe('Post Page', () => {
    const user = {
        id: 'U4CXI7PCE4dN1x2snku05kJpF7G2',
        fname: 'Rick',
        lname: 'Smith',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/myjar-8ff23.appspot.com/o/U4CXI7PCE4dN1x2snku05kJpF7G2%2Fprofile-picture?alt=media&token=7c170995-751e-4e75-905b-57cf396370c3'
    };

    it('renders the post and user data', () => {
        cy.visit('/post/9WbNEayqvB7iQNRxb4HG').then(() => {
            cy.get('[data-cy="post-title"]').should('have.text', post.postTitle);
            cy.get('[data-cy="post-subtitle"]').should('have.text', post.postSubTitle);
            cy.get('[data-cy="post-image"]').should('be.visible');
            cy.get('[data-cy="post-text"]>*').should('exist')
            cy.get('[data-cy="post-creater-name"]').should('have.text', `${user.fname} ${user.lname}`);
        })
    });

    // it('navigates to the user profile when the user avatar is clicked', () => {
    //     cy.visit('/profile/U4CXI7PCE4dN1x2snku05kJpF7G2');
    //     cy.url().should('include', '/profile/' + user.id);
    // });
});
