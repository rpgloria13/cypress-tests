import 'cypress-drag-drop';

describe('The Internet Test Suite', () => {
  // Login Page
  it('should verify successful login with valid credentials', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.get('#username').type('tomsmith');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/secure');
  });

  it('should verify appropriate error messages for invalid credentials', () => {
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.get('#username').type('invaliduser');
    cy.get('#password').type('invalidpassword');
    cy.get('button[type="submit"]').click();
    cy.get('.flash.error').should('be.visible');
  });

  // Checkboxes
  it('should confirm the ability to check and uncheck checkboxes', () => {
    cy.visit('https://the-internet.herokuapp.com/checkboxes');
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
    cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked');
  });

  // Dropdown
  it('should test the selection of options from a dropdown menu', () => {
    cy.visit('https://the-internet.herokuapp.com/dropdown');
    cy.get('#dropdown').select('Option 1').should('have.value', '1');
    cy.get('#dropdown').select('Option 2').should('have.value', '2');
  });

  // Dynamic Loading
  it('should test the dynamic loading of content and ensure it appears correctly', () => {
    cy.visit('https://the-internet.herokuapp.com/dynamic_loading/2');
    cy.get('#start button').click();
    cy.get('#finish', { timeout: 15000 }).should('contain.text', 'Hello World!');
  });

  // File Upload
  it('should validate file upload functionality', () => {
    cy.visit('https://the-internet.herokuapp.com/upload');
    const fileName = 'example.txt';
    cy.fixture(fileName).then(fileContent => {
      cy.xpath(`//input[@id='file-upload']`).attachFile({
        fileContent,
        fileName,
        mimeType: 'text/plain'
      });
    });
    cy.get('#file-submit').click();
    cy.get('#uploaded-files')
      .should('contain.text', fileName)
  });

  // JavaScript Alerts
  it('should test the handling of JavaScript alerts (accept/dismiss)', () => {
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
    cy.get('button:contains("Click for JS Alert")').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('I am a JS Alert');
    });
    cy.get('button:contains("Click for JS Confirm")').click();
    cy.on('window:confirm', () => true);
    cy.get('#result').should('have.text', 'You clicked: Ok');
  });
});

