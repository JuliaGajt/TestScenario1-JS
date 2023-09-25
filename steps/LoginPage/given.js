const { Given } = require('@wdio/cucumber-framework');
const loginData = require('../../data/logindata');
const loginPage = require('../../pageobjects/login.page');
const homePage = require('../../pageobjects/home.page');

Given(/user (.* )?(is not||is) logged in$/, async (email, isLog) => {
    
    await browser.deleteAllCookies()
    if(isLog === "is" && email !== ""){
        email = email.slice(0, -1)
        await loginPage.open()
        await loginPage.login(email, loginData.logindata.find(user => user.email == email).password)
    }

    await homePage.getGreetWelcomeUser()
    

})