describe("renders the navbar", () => {
    it("rendered correctly", () => {
        cy.visit("/");
        cy.get("h3").should("exist")
    })
})