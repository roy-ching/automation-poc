import { test as setup } from '@playwright/test';
import { LoginPage } from './tests/page-objects/LoginPage';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page)

    await loginPage.goTo()
    await expect(page).toHaveTitle('Payment Exchange')
    await loginPage.validLogin()
    await page.waitForLoadState('networkidle')

    await page.context().storageState({path: authFile});
    await browser.close()
})

export default globalSetup