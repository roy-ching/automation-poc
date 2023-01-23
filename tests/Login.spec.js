const { test, expect } = require('@playwright/test')
const { LoginPage } = require('./page-objects/LoginPage');
const { WelcomePage } = require('./page-objects/WelcomePage');

let loginPage;
let welcomePage;

test.describe('PMX Login - T5373276', () => {

    //Before Hook
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        welcomePage = new WelcomePage(page);
        await loginPage.goTo('#/vanco/signin');
        await expect(page).toHaveTitle('Payment Exchange')

    })
    
    test('Valid Login', async ({ page }) => {
        const username = 'RoyChingQA';
        const password = 'Testing12345';
        await loginPage.validLogin(username, password);
        await expect(welcomePage.header.logoImage).toBeVisible();
        await expect(welcomePage.header.titleText).toHaveText('Payment Exchange');
        await expect(welcomePage.title).toHaveText('Welcome to Vanco Payment Solutions Payment Exchange');
        await expect(welcomePage.header.clientLink).toBeVisible();
        await expect(welcomePage.header.userLink).toBeVisible();
        await expect(welcomePage.header.helpLink).toBeVisible();
        await expect(welcomePage.header.clientListSelect).toBeVisible();
        await expect(welcomePage.header.clientName).toBeHidden();
        await expect(welcomePage.header.cashManagementLink).toBeVisible();
        
    });


    test('Invalid Login', async ({ page }) => {
        await loginPage.invalidLogin();
        await loginPage.validatePopupMessage('The User ID and/or Password you entered are incorrect. You may return to the login page and try again or you may request a new password');
    });

})



module.exports = { LoginPage };