export class Header {

    constructor(page) {
        this.page = page
        this.logoImage = page.locator('.p5top.white.ng-scope > div > div > a > div > img')
        this.titleText = page.locator('.p5top.white.ng-scope > div > div > div.ng-binding')
        this.clientLink = page.locator('a[href^="#/vanco/createClientProfile"]')
        this.userLink = page.locator ('#SKey > a')
        this.helpLink = page.locator ('a[href="#/vanco/help"]')
        this.clientListSelect = page.locator ('input[placeholder="Enter Client Name or ID"]')
        this.clientName = page.locator ('span[data-ng-if^="currentClient.clientId"]')
        this.reportsLink = page.locator ('text=REPORTS')
        this.cashManagementLink = page.locator ('text=CASH MANAGEMENT')
    }
}