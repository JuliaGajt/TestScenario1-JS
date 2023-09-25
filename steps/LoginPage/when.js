const { When } = require('@wdio/cucumber-framework');
const loginPage = require('../../pageobjects/login.page')
const loginData = require('../../data/logindata')

When(/user sign in with (missing )?(password|email|all creds)?(.*)?$/, async (missing, creds, email) => {
    
    if(email){
        let user = loginData.logindata.find(user => user.email === email)
        if(user){
            await loginPage.login(email, user.password)
        } else {
            console.log(`There is no user with email: ${email}`)
        }
    } else {
        let sampleUser = {
            email: "sample.email@gmail.com",
            password: "samplePassword1"
        }
        if(missing && creds === "email"){await loginPage.login('',sampleUser.password);}
        if(missing && creds === "password"){await loginPage.login(sampleUser.email, '');}
        if(missing && creds === "all creds"){await loginPage.login('','');}
    }

})