import { Header } from "./component/Header"

export class WelcomePage {

    header = Header;

    constructor(page) {
        this.page = page
        this.header = new Header(page)
        this.title = page.locator('h1')
    }
}