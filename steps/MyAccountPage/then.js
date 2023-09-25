const { Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai')
const loginData = require('../../data/logindata')
const registerData = require('../../data/registerdata')
const myAccountPage = require('../../pageobjects/myaccount.page')


Then(/(.*) information should be visible$/, async emailOrName => {

    await myAccountPage.usernameAndEmailInfo.waitForDisplayed()
    if(emailOrName.includes("@")){
        let userName = loginData.logindata.find(user => user.email == emailOrName).userName
        expect(await myAccountPage.getUsernameAndEmailInfo()).equals(`${userName} ${emailOrName}`);
    } else {
        let user = registerData.registerdata.find(user => user.firstname == emailOrName)
        expect(await myAccountPage.getUsernameAndEmailInfo()).equals(`${user.firstname} ${user.lastname} ${user.email}`);    
    }

})

Then(`successful registration message should be visible`, async () => {
    expect(await myAccountPage.getSuccessfulRegisterMessage()).to.be.equal(`Thank you for registering with Main Website Store.`, `Registration wasn't successful.`)
})
