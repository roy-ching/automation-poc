const { test, expect } = require('@playwright/test')
const { LoginPage } = require('./page-objects/LoginPage')
const { WelcomePage } = require('./page-objects/WelcomePage')

// import ENV from '../utils/env'

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

    test('Validate Login Icon is displayed', async ({ page }) => {
        await expect(welcomePage.header.logoImage).toBeVisible()
    })

    test('Validate Header Title is displayed', async ({ page }) => {
        await expect(welcomePage.header.titleText).toHaveText('Payment Exchange')
    })

    test('Validate Top Right Menu is displayed', async ({ page }) => {
        await expect(welcomePage.header.clientLink).toBeVisible()
        await expect(welcomePage.header.userLink).toBeVisible()
        await expect(welcomePage.header.helpLink).toBeVisible()
    })

    test('Validate Nav bar web elements', async ({ page }) => {
        await expect(welcomePage.header.clientListSelect).toBeVisible()
        await expect(welcomePage.header.clientName).toBeHidden()
        await expect(welcomePage.header.cashManagementLink).toBeVisible()
    })

    test('Validate Body Title is displayed', async ({ page }) => {
        await expect(welcomePage.title).toHaveText('Welcome to Vanco Payment Solutions Payment Exchange')
    })

    test('Validate Privacy & Security link is displayed', async ({ page }) => {
        await expect(welcomePage.privacySecurityLink).toBeVisible()
    })

})
   

module.exports = { LoginPage };