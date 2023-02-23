import { Header } from "./component/Header"

export class WelcomePage {

    constructor(page) {
        this.page = page
        this.header = new Header(page)
        this.title = page.locator('h1')
        this.privacySecurityLink = page.locator('[href="pmx_online_security.html"]')
    }
}