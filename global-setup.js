import { chromium, expect } from '@playwright/test'
import { LoginPage } from './tests/page-objects/LoginPage'
import dotenv from "dotenv"

export default async config => {
    if (process.env.test_env){
        dotenv.config({
            path: `.env.${process.env.test_env}`,
            override:true
        })
    }

    const {storageState } = config.projects[0].use;
    const browser = await chromium.launch()
    const page = await browser.newPage()
    
    const loginPage = new LoginPage(page)

    await loginPage.goTo()
    await expect(page).toHaveTitle('Payment Exchange')
    await loginPage.validLogin()
    await page.waitForLoadState('networkidle')
    await page.context().storageState({ path: storageState })
    await browser.close()

}