const Key = require('webdriverio').Key;
const Page = require('./page');

class HomePage extends Page {
    
    get registerAccountButton () {return $('//a[.="Create an Account"]');}
    get loginAccountButton () {return $('//a[contains(., "Sign In")]');}
    get searchInput () {return $('#search');}

    async open() {
        await super.open('')
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
     * Searches for item in store
     * @param {string} item 
     */
    async searchItem(item){
        await this.searchInput.waitForDisplayed()
        await this.searchInput.clearValue()
        await this.searchInput.setValue(item)
        await browser.keys([Key.Enter]) 
    }   

}

module.exports = new HomePage();