const { Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai')
const registerPage = require('../../pageobjects/register.page')


Then(/(registration error|missing .*|password confirmation differ) message should be visible$/, async errorType => {
    
    if(errorType === 'registration error'){
        expect(await registerPage.getErrorMessageUserExist()).equals(`There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.`)
    } else {
        if(errorType === 'password confirmation differ'){
            expect(await registerPage.getErrorPasswordsDiffer()).equals("Please enter the same value again.")
        } else {
            if(errorType === "missing firstname"){expect(await registerPage.getFirstnameError()).equals("This is a required field.");}
            if(errorType === "missing lastname"){expect(await registerPage.getLastnameError()).equals("This is a required field.");}
            if(errorType === "missing email"){expect(await registerPage.getEmailError()).equals("This is a required field.");}
            if(errorType === "missing password"){expect(await registerPage.getPasswordError()).equals("This is a required field.");}
            if(errorType === "missing password confirmation"){expect(await registerPage.getPasswordConfirmError()).equals("This is a required field.");}
        }
    }

})
