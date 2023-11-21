// Test case for successful login with valid credentials
describe('Login Page', () => {
    it('should log in with valid credentials', () => {
        cy.visit('https://www.saucedemo.com/v1/index.html');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
    });

    it('should show error for invalid credentials', () => {
        cy.visit('https://www.saucedemo.com/v1/index.html');
        cy.get('#user-name').type('invalid_user');
        cy.get('#password').type('invalid_password');
        cy.get('#login-button').click();
        cy.xpath(`//h3[@data-test='error']`).should('be.visible');
    });
});
// Product Selection
describe('Product Selection End-to-End Test', () => {
    it('should select products and add them to the cart, then proceed to checkout', () => {
        // Navigate to the product page
        cy.visit('https://www.saucedemo.com/v1/inventory.html');

        // Select products (customize the product selection logic based on your application)
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.inventory_item').eq(1).find('.btn_inventory').click();

        // Verify that items are added to the cart
        cy.get('.shopping_cart_badge').should('have.text', '2');
        // Navigate to the cart
        cy.visit('https://www.saucedemo.com/v1/cart.html');

        // Verify items in the cart (customize the verification logic based on your application)
        cy.get('.cart_item').should('have.length.greaterThan', 0);

        // Navigate to the cart
        cy.visit('https://www.saucedemo.com/v1/cart.html');

        // Remove items from the cart 
        cy.get('.cart_item').first().find('.btn_secondary').click();
        cy.get('.cart_item').should('have.length.lessThan', 2);

        // Navigate to the checkout page
        cy.visit('https://www.saucedemo.com/v1/checkout-step-one.html');

        // Complete the checkout process (customize the checkout logic based on your application)
        cy.get('#first-name').type('John');
        cy.get('#last-name').type('Doe');
        cy.get('#postal-code').type('12345');
        cy.xpath(`//input[@class='btn_primary cart_button']`).click();
        cy.xpath(`//a[@class='btn_action cart_button']`).click();
        cy.xpath(`//h2[@class='complete-header']`).should('have.text', 'THANK YOU FOR YOUR ORDER')

        // Navigate to the product page
        cy.visit('https://www.saucedemo.com/v1/inventory.html');

        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.xpath(`//a[@href='./cart.html']`).click()

        // Implement "Continue Shopping" logic (customize based on your application)
        cy.xpath(`//a[@href='./inventory.html' and text()='Continue Shopping']`).click();
        // Verify that it navigates back to the product page
        cy.get('.product_label').should('be.visible')
    })
});

// Sort Products
describe('Sort Products', () => {
    it('should test product sorting functionality', () => {
        // Navigate to the product page
        cy.visit('https://www.saucedemo.com/v1/inventory.html');

        // Implement sorting logic (customize based on your application)
        cy.get('.product_sort_container').select('az');
        // Verify that products are sorted accordingly
        cy.get('.inventory_item')
            .invoke('text')
            .then((productText) => {
                const sortedProducts = productText.split('\n');
                const sortedAlphabetically = [...sortedProducts].sort();
                expect(sortedProducts).to.deep.equal(sortedAlphabetically);
            });
    });
});

// Filter Products
describe('Filter Products', () => {
    it('should validate product filtering options', () => {
        // Navigate to the product page
        cy.visit('https://www.saucedemo.com/v1/inventory.html');

        // Implement filtering logic (customize based on your application)
        cy.get('.product_sort_container').select('hilo');
        // Verify that products are filtered accordingly
        cy.get('.inventory_item')
            .invoke('text')
            .then((productText) => {
                const prices = productText.match(/\d+\.\d+/g).map(Number);
                const sortedPrices = [...prices].sort((a, b) => b - a);
                expect(prices).to.deep.equal(sortedPrices);
            });
    });
});

// Continue Shopping
describe('Continue Shopping', () => {
    it('should verify "Continue Shopping" functionality', () => {
        // Navigate to the product page
        cy.visit('https://www.saucedemo.com/v1/inventory.html');

        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.xpath(`//a[@href='./cart.html']`).click()

        // Implement "Continue Shopping" logic (customize based on your application)
        cy.xpath(`//a[@href='./inventory.html' and text()='Continue Shopping']`).click();
        // Verify that it navigates back to the product page
        cy.get('.product_label').should('be.visible')
    });
});