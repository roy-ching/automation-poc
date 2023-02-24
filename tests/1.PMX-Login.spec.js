import { test, expect } from '@playwright/test'
import { WelcomePage } from './page-objects/WelcomePage'

let welcomePage

test.describe('PMX Login - T5373276', () => {

    // Before Hook
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        welcomePage = new WelcomePage(page)
    })

    test('Validate Login Icon is displayed', async ({  }) => {
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