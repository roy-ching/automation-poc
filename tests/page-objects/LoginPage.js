import { expect } from "@playwright/test"

export class LoginPage {


    constructor(page) {
        this.page = page;
        this.userIdField = page.locator('[placeholder="User ID"]')
        this.passwordField = page.locator('[placeholder="Password"]')
        this.logindButton = page.locator('[value="Login"]')

    }

    async goTo(path) {
        await this.page.goto(path)
    }

    async validLogin(username, password) {
        await this.userIdField.type(username)
        await this.passwordField.type(password)
        await this.logindButton.click()
    }

    async invalidLogin() {
        await this.userIdField.type('invalid')
        await this.passwordField.type('invalid')
        await this.logindButton.click()

    }

    async validatePopupMessage(message) {
        this.page.on('dialog', async (dialog) => {
            await expect(dialog.message()).toContainText(message)
            await dialog.accept()
        }
        )
    }
}