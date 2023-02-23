import { test, expect } from '@playwright/test'
import { LoginPage } from './page-objects/LoginPage'
import { WelcomePage } from './page-objects/WelcomePage'
import { HomePage } from './page-objects/HomePage'

let loginPage
let welcomePage
let homePage

test.describe('Assign and Reject  Payments- T5373277', () => {

    //Before Hook
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext()
        const page = await context.newPage()
        
        loginPage = new LoginPage(page)
        welcomePage = new WelcomePage(page)
        homePage = new HomePage(page)

        await loginPage.goTo()
        await loginPage.validLogin()
        await expect(page).toHaveTitle('Payment Exchange')
        await welcomePage.header.selectClientName('Demo-Client555')
        expect(await welcomePage.header.clientName.textContent()).toContain('Demo-Client555')
        await page.waitForLoadState('networkidle')
        await homePage.pendingTransactionsLink.waitFor()
        await context.storageState({path: 'state.json'})
    })

    test ('Validate transaction columns', async ({ page }) => {
        await expect(homePage.accountNumberColumn).toHaveText('Account Number')
        await expect(homePage.customerNameColumn).toHaveText('Customer Name')
        await expect(homePage.amountColumn).toHaveText('Amount')
        await expect(homePage.receivedColumn).toHaveText('Received')
        await expect(homePage.processedByColumn).toHaveText('Processed By')
        await expect(homePage.statusColumn).toHaveText('Status')
        await expect(homePage.tasksColumn).toHaveText('Tasks')
    })

    test ('Assign transaction', async ({ page }) => { 
        await homePage.selectStatusFilter('assigned')
        const assignedTotalBefore = await homePage.getTotalRows()
        await homePage.selectStatusFilter('pending')
        await homePage.assignFirstTransaction()
        await homePage.selectStatusFilter('assigned')
        const newValue = await homePage.getTotalRows()
        expect(assignedTotalBefore).toBeLessThanOrEqual(newValue)
    })
})