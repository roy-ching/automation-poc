const { test, expect } = require('@playwright/test')
const { LoginPage } = require('./page-objects/LoginPage')
const { WelcomePage } = require('./page-objects/WelcomePage')

let loginPage
let welcomePage

test.describe('PMX Login - T5373276', () => {

    //Before Hook
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        const page = await context.newPage()

        loginPage = new LoginPage(page)
        welcomePage = new WelcomePage(page)
        
        await loginPage.goTo()
        await expect(page).toHaveTitle('Payment Exchange')
        await loginPage.validLogin()
        await page.waitForLoadState('networkidle')
        await context.storageState({path: 'state.json'})
    })

    test.afterAll(async ({ browser }) => {
        await browser.close()
        console.log('Done with tests')
      })

    test('Validate Login Icon is displayed', async ({ page }) => {
        await expect(welcomePage.header.logoImage).toBeVisible({timeout: 90000})
    })

    test('Validate Top Right Menu is displayed', async ({ page }) => {
        await expect(welcomePage.header.clientLink).toBeVisible()
        await expect(welcomePage.header.userLink).toBeVisible()
        await expect(welcomePage.header.helpLink).toBeVisible()
    })

    test('Validate Nav bar web elements', async ({ page }) => {
        await expect(welcomePage.header.clientNameInput).toBeVisible()
        await expect(welcomePage.header.cashManagementLink).toBeVisible()
    })

    test('Validate Body Title is displayed', async ({ page }) => {
        await expect(welcomePage.title).toHaveText('Welcome to Vanco Payment Solutions Payment Exchange')
    })

    test('Validate Privacy & Security link is displayed', async ({ page }) => {
        await expect(welcomePage.privacySecurityLink).toBeVisible()
    })

})