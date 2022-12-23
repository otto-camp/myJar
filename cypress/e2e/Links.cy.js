/* eslint-disable no-undef */
describe('Check all links', () => {
    it('visits all links on the page', () => {
        cy.visit('http://localhost:8080/');

        cy.get("a").each($a => {
            const message = $a.text();
            expect($a, message).to.have.attr("href").not.contain("undefined");
        });
    });
});
