
class Page {

    get notLoggedWelcome() { return $('span[class="not-logged-in"]');}

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`${browser.options.baseUrl}${path}`)
    }

    async getPageTitle() {
        return await browser.getTitle();
    }

    /**
     * Takes user to Register page
     */
    async goToRegisterAccountPage() {
        await this.registerAccountButton.waitForDisplayed()
        await this.registerAccountButton.click()
    }

    /**
     * Takes user to Login page
     */
    async goToLoginAccountPage() {
        await this.loginAccountButton.waitForDisplayed()
        await this.loginAccountButton.click()
    }


}

module.exports = Page 
