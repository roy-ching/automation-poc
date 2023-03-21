export class RejectPayment {

    constructor(page) {
        this.page = page
        this.reason = page.locator('select[name="rejectReasonOps"]').nth(0)
        this.alwaysReject = page.locator('select[data-ng-if="currentClient.alwaysReject"]').nth(0)
    }
}