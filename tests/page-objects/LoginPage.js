import { expect } from "@playwright/test"
import ENV from '../utils/env'

export class LoginPage {

    constructor(page) {
        this.page = page;
        this.userIdField = page.locator('[placeholder="User ID"]')
        this.passwordField = page.locator('[placeholder="Password"]')
        this.logindButton = page.locator('[value="Login"]')
    }

    async goTo() {
        await this.page.goto('https://pmx-qa.vancopayments.com/#/vanco/signin')
    }

    async validLogin() {
        await this.userIdField.type('QAAutomation')
        await this.passwordField.type('1234test')
        await this.logindButton.click({force: true})
        await this.page.waitForURL('**/vanco/home');
    }

    async invalidLogin() {
        await this.userIdField.type('invalid')
        await this.passwordField.type('invalid')
        await this.logindButton.click({force: true})
        
    }

    async validatePopupMessage(message) {
        this.page.on('dialog', async (dialog) => {
            await expect(dialog.message()).toContainText(message)
            await dialog.accept()
        }
        )
    }
}