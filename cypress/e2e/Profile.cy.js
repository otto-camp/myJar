/* eslint-disable no-undef */
describe('Profile Page', () => {
    const user = {
        id: 'U4CXI7PCE4dN1x2snku05kJpF7G2',
        fname: 'Rick',
        lname: 'Smith',
        photoUrl: 'https://firebasestorage.googleapis.com/v0/b/myjar-8ff23.appspot.com/o/U4CXI7PCE4dN1x2snku05kJpF7G2%2Fprofile-picture?alt=media&token=7c170995-751e-4e75-905b-57cf396370c3'
    }


    it('renders the profile, social section, and post section', () => {
        cy.visit('/profile/U4CXI7PCE4dN1x2snku05kJpF7G2').then(() => {
            cy.get('h1').should('have.text', `${user.fname} ${user.lname}`);
            cy.get('img[alt="Rick Smith"]').should('exist');

            //social links
            cy.get('a[aria-label="Rick Smith website"]').should('exist');
            cy.get('a[aria-label="Rick Smith github"]').should('exist');
            cy.get('a[aria-label="Rick Smith twitter"]').should('exist');
            cy.get('a[aria-label="Rick Smith facebook"]').should('exist');
            cy.get('a[aria-label="Rick Smith instagram"]').should('exist');

            //posts
            cy.get('article').then(() => {
                cy.get('p[aria-label="Post Title"]').should('exist');
                cy.get('p[aria-label="Post Sub title"]').should('exist');
                cy.get('img').should('exist');
            })
        })
    })
})