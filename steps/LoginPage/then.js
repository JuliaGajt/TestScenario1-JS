const { Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai')
const loginPage = require('../../pageobjects/login.page')

Then(/error about (invalid|missing) (.*) data should be visible$/, async (typeError, data) => {


    if(typeError === "invalid"){
        expect(await loginPage.getLoginError()).equals('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    } else {
        
        if(data === 'email'){expect(await loginPage.getEmailError()).equals("This is a required field.");}
        if(data === 'password'){expect(await loginPage.getPassError()).equals("This is a required field.");}
        if(data === 'all creds'){
            expect(await loginPage.getPassError()).equals("This is a required field.");
            expect(await loginPage.getEmailError()).equals("This is a required field.");
        }

    }

})

Then(`error message "You should login before adding item to Wish List" should be visible`, async () => {
    expect(await loginPage.getErrorMessageWishList()).equals('You must login or register to add items to your wishlist.')
})