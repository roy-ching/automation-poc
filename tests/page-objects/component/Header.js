export class Header {

    constructor(page) {
        this.page = page
        this.logoImage = page.locator('.p5top.white.ng-scope > div > div > a > div > img')
        this.titleText = page.locator('.p5top.white.ng-scope > div > div > div.ng-binding')
        this.clientLink = page.locator('a[href^="#/vanco/createClientProfile"]')
        this.userLink = page.locator ('#SKey > a')
        this.helpLink = page.locator ('a[href="#/vanco/help"]')
        this.clientNameInput = page.locator ('input[placeholder="Enter Client Name or ID"]')
        this.clientName = page.locator (' .ng-binding.ng-scope')
       
        this.clientFirstResult = page.locator ('[class="ng-binding ng-scope"]')
        this.reportsLink = page.locator ('text=REPORTS')
        this.cashManagementLink = page.locator ('text=CASH MANAGEMENT')
    }

    async selectClientName(name) {
        await this.clientNameInput.waitFor()
        await this.clientNameInput.type(name)
        await this.clientFirstResult.click({force: true})
    }
}