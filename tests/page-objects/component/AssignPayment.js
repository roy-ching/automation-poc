export class AssignPayment {

    constructor(page) {
        this.page = page
        this.copyButton = page.locator('button[class="brandAccentColorTxt btnClean btnCopy"]').nth(0)
        this.receivedAccount = page.locator('input[class="brandAccentColorTxt ng-pristine ng-untouched ng-valid ng-not-empty"]').nth(0)
        this.assignedAccount = page.locator('input[class="brandAccentColorTxt ng-pristine ng-untouched ng-not-empty ng-valid ng-valid-required"]').nth(0)
        this.group = page.locator('select[data-ng-if="userAvailableGroups.length!=0"]').nth(0)
        this.alwaysAssignedAccountCb = page.locator('select[class="brandAccentColorTxt ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-required"]').nth(0)
        this.assignButton =  page.locator(('button:has-text("Assign")')).nth(1)
        this.skipButton =  page.locator(('button:has-text("Skip")')).nth(0)
        this.closeButton = page.locator('button.floatRight.btnClean.txtWhite.btnGridCloseLoc').nth(1)
    }
}