const Page = require('./page');

class RegisterPage extends Page { 

    get firstNameInput () {return $('#firstname');}
    get lastNameInput () {return $('#lastname');}
    get emailInput () {return $('#email_address');}
    get passwordInput () {return $('#password');}
    get passwordConfirmInput () {return $('#password-confirmation');}
  
    get submitButton () {return $('//button[@title="Create an Account"]');}
    
    get firstNameError () {return $('#firstname-error');}
    get lastNameError () {return $('#lastname-error');}
    get emailError () {return $('#email_address-error');}
    get passwordError () {return $('#password-error');}
    get passwordConfirmError () {return $('#password-confirmation-error');}

    get errorMessageUserExist () { return $('div[data-ui-id="message-error"] > div');}
    get errorPasswordConfirmation () { return $('#password-confirmation-error');}

    get registrationLegend () { return $$('.legend > span');}

    async open() {
        await super.open('customer/account/create/')
    }

    /**
     * Returns headers, of sections to be filled during registration.
     * @returns {[string]}
     */
    async getRegistrationLegend() { 
        return await this.registrationLegend.map( semiHeader => {
            return semiHeader.getText();
        });
    }

    /**
     * Register new user with below credentials
     * @param {string} firstname 
     * @param {string} lastname 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirmation 
     */
    async registerNewUser(firstname, lastname, email, password, passwordConfirmation){

        await this.firstNameInput.waitForDisplayed()
        await this.firstNameInput.setValue(firstname)
        await this.lastNameInput.setValue(lastname)
        await this.emailInput.setValue(email)
        await this.passwordInput.setValue(password)
        await this.passwordConfirmInput.setValue(passwordConfirmation)
        await this.submitButton.click()

    }
    
    async getFirstnameError() {return await this.firstNameError.getText();}
    async getLastnameError() {return await this.lastNameError.getText();}
    async getEmailError() {return await this.emailError.getText();}
    async getPasswordError() {return await this.passwordError.getText();}
    async getPasswordConfirmError() {return await this.passwordConfirmError.getText();}

    async getErrorMessageUserExist () { return await this.errorMessageUserExist.getText();}
    async getErrorPasswordsDiffer () {return await this.errorPasswordConfirmation.getText();}

}

module.exports = new RegisterPage();