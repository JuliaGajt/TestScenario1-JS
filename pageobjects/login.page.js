const Page = require('./page');


class LoginPage extends Page {

    get inputEmail () {return $('#email');}
    get inputPassword () {return $('//input[@id="pass" and @title="Password"]');}
    get btnSubmit () {return $("//button[@id='send2' and contains(@class,'login primary')]");}
    
    get errorRequiredEmail () {return $("#email-error");}
    get errorRequiredPassword () {return $("#pass-error");}

    get errorLogin () { return $("div[data-ui-id='message-error'] > div")}

    get errorWishList () { return $(`div[data-ui-id='message-error'] > div`)}

    open () {
        return super.open('customer/account/login/');
    }

    /**
     * Login user with given email and password
     * @param {string} email 
     * @param {string} password 
     */
    async login (email, password) {
        await (await this.inputEmail).waitForDisplayed();
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async getEmailError() { return (await this.errorRequiredEmail).getText();}
    async getPassError() { return (await this.errorRequiredPassword).getText();}
    async getLoginError() { return (await this.errorLogin).getText();}
    async getErrorMessageWishList() { return (await this.errorWishList).getText()}
}

module.exports = new LoginPage();
