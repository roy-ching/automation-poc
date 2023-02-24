import { Header } from "./component/Header"
import { AssignPayment } from "./component/AssignPayment"
import { expect } from '@playwright/test'

export class HomePage {

    header = Header
    assignPayment = AssignPayment

    constructor(page) {
        this.page = page
        this.header = new Header(page)
        this.assignPayment = new AssignPayment(page)
        this.pendingTransactionsLink = page.locator('a.btnClean.btnMetrics.selected-view')
        this.postedTransactionsLink = page.locator('a.btnClean.btnMetrics.selected-view')
        this.transactionsList = page.locator('[data-ng-repeat="x in gridData"]')
        this.accountNumberColumn = page.locator('[class="thColor txtCnt"]:nth-child(1)')
        this.customerNameColumn = page.locator('[class="thColor txtCnt"]:nth-child(2)')
        this.amountColumn = page.locator('[class="thColor txtCnt"]:nth-child(3)')
        this.receivedColumn = page.locator('[class="thColor txtCnt"]:nth-child(4)')
        this.processedByColumn = page.locator('[class="thColor txtCnt"]:nth-child(5)')
        this.statusColumn = page.locator('[class="thColor txtCnt"]:nth-child(6)')
        // There is a hidden column, that's why Tasks has index 8
        this.tasksColumn = page.locator('[class="thColor txtCnt"]:nth-child(8)')
        this.transactionsList = page.locator('[data-ng-repeat="x in gridData"]')
        this.assignButtons = page.locator('button:has-text("Assign")')
        this.statusFilterSelect = page.locator('table > tbody > tr > td:nth-child(3) > select')
        this.rowsList = page.locator('#gridrecord')
    }

    async selectStatusFilter(status) {
        await this.page.waitForTimeout(2000)
        const statusSelect = await this.statusFilterSelect

        if (await status == 'pending') {
            await statusSelect.selectOption('string:PENDING')
        }

        if (status == 'assigned') {
            await statusSelect.selectOption('string:ASSIGNED')
        }
    }

    async assignFirstTransaction() {
        await this.page.waitForTimeout(2000)
        const count = await this.transactionsList.count()
        if (count > 0) {
            await this.transactionsList.nth(0).locator('button:has-text("Assign")').click()
        }
        else {
            console.log('No Pending transactions')
        }
        await this.copyAccount()
        const assignedValue = await this.assignPayment.assignedAccount.textContent()
        const receivedValue = await this.assignPayment.receivedAccount.textContent()
        expect(assignedValue).toEqual(receivedValue)
        await this.assignPayment.group.selectOption("number:4736")
        await this.assignPayment.assignButton.click()
        await this.transactionsList.nth(0).locator('button.floatRight.btnClean.txtWhite.btnGridCloseLoc').click()
    }

    async copyAccount() {
        await this.assignPayment.copyButton.click({ force: true })
    }

    async getTotalRows() {
        return await this.rowsList.count()
    }
}