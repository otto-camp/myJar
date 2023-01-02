/* eslint-disable no-undef */
describe('Post Page', () => {
    const post = {
        postTitle: 'SEO Optimization For Small Businesses',
        postSubTitle: 'Improve your small business\'s online visibility & drive sales with professional SEO optimization services.',
        postThumbnail: 'https://firebasestorage.googleapis.com/v0/b/myjar-8ff23.appspot.com/o/U4CXI7PCE4dN1x2snku05kJpF7G2%2F9WbNEayqvB7iQNRxb4HG?alt=media&token=13292e62-af87-4143-99dd-ed37daba99be',
        timestamp: { seconds: 1623472000 }
    };

    const user = {
        id: 'U4CXI7PCE4dN1x2snku05kJpF7G2',
        fname: 'Rick',
        lname: 'Smith',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/myjar-8ff23.appspot.com/o/U4CXI7PCE4dN1x2snku05kJpF7G2%2Fprofile-picture?alt=media&token=7c170995-751e-4e75-905b-57cf396370c3'
    };

    it('renders the post and user data', () => {
        cy.visit('/post/9WbNEayqvB7iQNRxb4HG').then(() => {
            cy.get('h1').should('have.text', post.postTitle);
            cy.get('h2').should('have.text', post.postSubTitle);
            cy.get('img').should('have.attr', 'src', post.postThumbnail);
            cy.get('[role=article]').should('not.be.empty')
            cy.get('h3').should('have.text', `${user.fname} ${user.lname}`);
        })
    });

    it('navigates to the user profile when the user avatar is clicked', () => {
        cy.visit('/profile/U4CXI7PCE4dN1x2snku05kJpF7G2');
        cy.url().should('include', '/profile/' + user.id);
    });
});
