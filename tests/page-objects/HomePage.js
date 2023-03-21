import { Header } from "./component/Header"
import { AssignPayment } from "./component/AssignPayment"
import { expect } from '@playwright/test'
import { RejectPayment } from "./component/RejectPayment"

export class HomePage {

    header = Header
    assignPayment = AssignPayment
    rejectPayment = RejectPayment

    constructor(page) {
        this.page = page
        this.header = new Header(page)
        this.assignPayment = new AssignPayment(page)
        this.rejectPayment = new RejectPayment(page)
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
        this.closePayment = page.locator('(//button[@class="floatRight btnClean txtWhite btnGridCloseLoc"])[1]')
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

        if (status == 'rejected') {
            await statusSelect.selectOption('string:REJECTED')
        }
    }

    async assignEditFirstTransaction(action) {
        await this.page.waitForTimeout(2000)
        const count = await this.transactionsList.count()
        if (count > 0) {
            if (action == 'Assign')
                await this.transactionsList.nth(0).locator('button:has-text("Assign")').click()
            else if (action == 'Update')
                await this.transactionsList.nth(0).locator('button:has-text("Update")').click()
            else if (action == 'Reject')
                await this.transactionsList.nth(0).locator('button:has-text("Reject")').click()
        }
        else {
            console.log('No Pending transactions')
        }
    }

    async assignFirstTransaction() {
        await this.assignEditFirstTransaction('Assign')
        await this.copyAccount()
        const assignedValue = await this.assignPayment.assignedAccount.textContent()
        const receivedValue = await this.assignPayment.receivedAccount.textContent()
        expect(assignedValue).toEqual(receivedValue)
        await this.assignPayment.group.selectOption({ index: 0 })
        await this.assignPayment.assignButton.click()
        await this.transactionsList.nth(0).locator('button.floatRight.btnClean.txtWhite.btnGridCloseLoc').click()
    }

    async updateFirstTransaction() {
        await this.assignEditFirstTransaction('Update')
        await this.copyAccount()
        await this.assignPayment.group.hover()
        await this.assignPayment.group.selectOption({ index: 1 })
        await this.assignPayment.alwaysAssignedAccountCb.selectOption({ index: 1 })
        await this.page.click('button:has-text("Assign")')
    }

    async rejectFirstPendingTransaction(){
        await this.assignEditFirstTransaction('Reject')
        await this.rejectPayment.reason.hover()
        await this.rejectPayment.reason.selectOption({ index: 1 })
        await this.rejectPayment.alwaysReject.selectOption({ label: 'No' })
        await this.page.click('button:has-text("Submit")')
    }

    async verifyChanges() {
        this.assignEditFirstTransaction('Update')
        await this.assignPayment.group.hover()
    }

    async updatePaymentWithoutGroup() {
        this.assignEditFirstTransaction('Update')
        await this.assignPayment.group.hover()
        await this.assignPayment.group.selectOption({ label: 'Select a group' })
        await this.page.click('button:has-text("Assign")')
    }

    async copyAccount() {
        await this.assignPayment.copyButton.waitFor()
        await this.assignPayment.copyButton.focus()
        await this.assignPayment.copyButton.click()
    }

    async getTotalRows() {
        return await this.rowsList.count()
    }
}