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

    test ('Assign transaction', async ({ }) => { 
        await homePage.selectStatusFilter('assigned')
        const assignedTotalBefore = await homePage.getTotalRows()
        await homePage.selectStatusFilter('pending')
        await homePage.assignFirstTransaction()
        await homePage.selectStatusFilter('assigned')
        const newValue = await homePage.getTotalRows()
        expect(assignedTotalBefore).toBeLessThanOrEqual(newValue)
    })

    test('Update transaction', async ({ page}) => { 
        await homePage.selectStatusFilter('assigned')
        await homePage.updateFirstTransaction()
        await homePage.verifyChanges()

        await expect(homePage.assignPayment.group).toContainText('Water Payment');
        await expect(homePage.assignPayment.alwaysAssignedAccountCb).toContainText('No');
    })

    test('Select Group should be mandatory', async ({  }) => { 
        await homePage.selectStatusFilter('assigned')
        await homePage.updatePaymentWithoutGroup()
        await expect(homePage.assignPayment.group).toHaveAttribute('class',/ng-invalid-required checked/)
    })

    test('Reject transaction', async ({  }) => { 
        await homePage.selectStatusFilter('rejected')
        const rejectTotalBefore = await homePage.getTotalRows()
        await homePage.selectStatusFilter('pending')
        await homePage.rejectFirstPendingTransaction()
        await homePage.selectStatusFilter('rejected')
        const newValue = await homePage.getTotalRows()
        expect(rejectTotalBefore).toBeLessThanOrEqual(newValue)
    })

    test ('Change from Rejected to Asigned', async ({  }) => { 
        await homePage.selectStatusFilter('rejected')
        const assignedTotalBefore = await homePage.getTotalRows()
        await homePage.updateFirstTransaction()
        const newValue = await homePage.getTotalRows()
        expect(newValue).toBeLessThan(assignedTotalBefore)
    })
})