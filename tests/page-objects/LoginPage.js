import { expect } from "@playwright/test"

export class LoginPage {

    constructor(page) {
        this.page = page;
        this.userIdField = page.locator('[placeholder="User ID"]')
        this.passwordField = page.locator('[placeholder="Password"]')
        this.logindButton = page.locator('[value="Login"]')
    }

    async goTo() {
        await this.page.goto(process.env.BASE_URL)
    }

    async validLogin() {
        await this.userIdField.type(process.env.USERNAME)
        await this.passwordField.type(process.env.PASSWORD)
        await this.logindButton.click({ force: true })
        await this.page.waitForURL('**/vanco/home');
    }

    async invalidLogin() {
        await this.userIdField.type('invalid')
        await this.passwordField.type('invalid')
        await this.logindButton.click({ force: true })

    }

    async validatePopupMessage(message) {
        this.page.on('dialog', async (dialog) => {
            await expect(dialog.message()).toContainText(message)
            await dialog.accept()
        }
        )
    }
}