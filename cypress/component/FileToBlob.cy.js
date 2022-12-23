/* eslint-disable no-undef */
import { fileToBlob } from '../../src/utils/FileToBlob';

it('converts a file to a blob', () => {
    cy.get('input[type="file"]').then(input => {
        const file = new File(['file content'], 'file.txt', {
            type: 'text/plain'
        });
        cy.wrap(input).trigger('change', { target: { files: [file] } });
    });

    cy.wait(500);

    cy.window().then(window => {
        const blob = cy.wrap(window.blob);
        blob.should('have.property', 'size', 9);
        blob.should('have.property', 'type', 'text/plain');
    });
});
