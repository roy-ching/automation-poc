import { expect } from "@playwright/test"
import ENV from '../utils/env'

export class LoginPage {


    constructor(page) {
        this.page = page;
        this.userIdField = page.locator('[placeholder="User ID"]')
        this.passwordField = page.locator('[placeholder="Password"]')
        this.logindButton = page.locator('[value="Login"]')

    }

    async goTo(path) {
        console.log('***ENV***'+ENV.BASE_URL)
        await this.page.goto(ENV.BASE_URL)
        // await this.page.goto(`${conf.use?.baseURL}${path}`)
    }

    async validLogin() {
        await this.userIdField.type(ENV.USERNAME)
        await this.passwordField.type(ENV.PASSWORD)
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