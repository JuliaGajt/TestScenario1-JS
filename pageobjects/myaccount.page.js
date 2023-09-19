const Page = require('./page');

class MyAccountPage extends Page { 

    get usernameAndEmailInfo () {return $('//div[contains(@class, "information")]//p');}
    get successfulRegistrationMessage () {return $('//div[contains(@class,"message-success")]/div');}

    async open() {
        await super.open('customer/account/')
    }
    
    async getUsernameAndEmailInfo() {
        await this.usernameAndEmailInfo.waitForDisplayed()
        let userData = await this.usernameAndEmailInfo.getText();
        return await userData.replace("\n", " ");
    }

    async getSuccessfulRegisterMessage() { 
        await this.successfulRegistrationMessage.waitForDisplayed()
        return await this.successfulRegistrationMessage.getText();
    }

}

module.exports = new MyAccountPage();