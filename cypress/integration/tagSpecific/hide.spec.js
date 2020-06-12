
describe('Hide Tag Tests', function () {

  beforeEach(() => {

    cy.visit('/test')

  })


  it('reffed hide is not a property', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <booleaninput label="hide" name="bib" />
  <p name="p1"><hide><ref prop="value">bib</ref></hide>
  This paragraph should be hidden when box is checked.
  </p>
  <p name="p2"><ref prop="hide">p1</ref>
  This paragraph should not be hidden, but should include boolean text.
  </p>
  <p name="p3"><hide><ref prop="hide">p1</ref></hide>
  This paragraph should also be hidden when boxed is checked.
  </p>
  `}, "*");
    });

    cy.log('initial state');
    cy.get('p#\\/p1').should('have.text', '\n  This paragraph should be hidden when box is checked.\n  ')
    cy.get('p#\\/p2').should('have.text', 'false\n  This paragraph should not be hidden, but should include boolean text.\n  ')
    cy.get('p#\\/p3').should('have.text', '\n  This paragraph should also be hidden when boxed is checked.\n  ')

    cy.log('check the box')
    cy.get('#\\/bib_input').click();

    cy.get('p#\\/p1').should('not.exist')
    cy.get('p#\\/p2').should('have.text', 'true\n  This paragraph should not be hidden, but should include boolean text.\n  ')
    cy.get('p#\\/p3').should('not.exist')

    cy.log('uncheck the box')
    cy.get('#\\/bib_input').click();
    cy.get('p#\\/p1').should('have.text', '\n  This paragraph should be hidden when box is checked.\n  ')
    cy.get('p#\\/p2').should('have.text', 'false\n  This paragraph should not be hidden, but should include boolean text.\n  ')
    cy.get('p#\\/p3').should('have.text', '\n  This paragraph should also be hidden when boxed is checked.\n  ')

  })

})


