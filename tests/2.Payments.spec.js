import { test, expect } from '@playwright/test'
import { WelcomePage } from './page-objects/WelcomePage'
import { HomePage } from './page-objects/HomePage'

let welcomePage
let homePage

test.describe('Assign and Reject  Payments- T5373277', () => {

    const client = 'Demo-Client555'
    
    //Before Hook
    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        homePage = new HomePage(page)
        welcomePage = new WelcomePage(page)
        await welcomePage.header.selectClientName(client)
        expect(await welcomePage.header.clientName.textContent()).toContain(client)
        await page.waitForLoadState('networkidle')
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