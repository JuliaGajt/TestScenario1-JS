const Key = require('webdriverio').Key;
const Page = require('./page');

class HomePage extends Page {
    
    get registerAccountButton () {return $('//a[.="Create an Account"]');}
    get loginAccountButton () {return $('//a[contains(., "Sign In")]');}
    get searchInput () {return $('#search');}
    get accountOptionsToggleBtn () { return $(`button[data-action="customer-menu-toggle"]`)}
    get myAccountOptBtn () { return $(`//div[@class="customer-menu"]/ul/li/a[text()='My Account']`)}
    get myWishListOptBtn () { return $(`//div[@class="customer-menu"]/ul/li/a[text()='My Wish List ']`)}
    get signOutOptBtn () { return $(`//div[@class="customer-menu"]/ul/li/a[contains(text(), 'Sign Out')]`)}
    get greetWelcome () { return $(`//li[@class="greet welcome"]`)}

    async open() {
        await super.open('')
    }

    /**
     * Searches for item in store
     * @param {string} item 
     */
    async searchItem(item){
        await this.searchInput.waitForDisplayed()
        await this.searchInput.clearValue()
        await this.searchInput.setValue(item)
        await browser.keys([Key.Enter]) 
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

    /**
     * User must be logged in to see this option
     * Takes user to My Account page
     */
    async goToMyAccountPage() {
        await this.accountOptionsToggleBtn.waitForDisplayed()
        await this.accountOptionsToggleBtn.click()
        await this.myAccountOptBtn.waitForDisplayed()
        await this.myAccountOptBtn.click()
    }

    /**
     * User must be logged in to see this option
     * Takes user to My Wish List page
     */
    async goToWishListPage() {
        await this.accountOptionsToggleBtn.waitForDisplayed()
        await this.accountOptionsToggleBtn.click()
        await this.myWishListOptBtn.waitForDisplayed()
        await this.myWishListOptBtn.click()
    }

    /**
     * User must be logged in to see this option
     * Sign out user
     */
    async signOut() {
        await this.accountOptionsToggleBtn.waitForDisplayed()
        await this.accountOptionsToggleBtn.click()
        await this.signOutOptBtn.waitForDisplayed()
        await this.signOutOptBtn.click()
    }

    async getGreetWelcomeUser() {
        await this.greetWelcome.waitForDisplayed()
        return this.greetWelcome
    }

}

module.exports = new HomePage();