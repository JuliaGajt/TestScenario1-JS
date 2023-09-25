const { When } = require('@wdio/cucumber-framework');
const registerPage = require('../../pageobjects/register.page')
const registerData = require('../../data/registerdata')

When(/registering user with (missing .*)?(different passwords)?(.*)?$/, async (missingData, diffPass, firstName) => {

    if(firstName){
        let user = registerData.registerdata.find(user => user.firstname === firstName)
        if(user){
            await registerPage.registerNewUser(user.firstname, user.lastname, user.email, user.password, user.passwordConfirm);
        } else {
            console.log(`There is no user with first name: ${firstName}`)
        }
    } else {

        let sampleUser =     {
            firstname : 'Test1',
            lastname : 'Something1',
            email : 'testCase12345.Something1@gmail.com',
            password : 'SomeGoodPassword1',
            passwordConfirm : 'SomeGoodPassword2'
        }
        if(missingData === "missing email"){await registerPage.registerNewUser(sampleUser.firstname, sampleUser.lastname, '', sampleUser.password, sampleUser.passwordConfirm);}
        if(missingData === "missing password"){await registerPage.registerNewUser(sampleUser.firstname, sampleUser.lastname, sampleUser.email, '', sampleUser.passwordConfirm);}
        if(missingData === "missing firstname"){await registerPage.registerNewUser('', sampleUser.lastname, sampleUser.email, sampleUser.password, sampleUser.passwordConfirm);}
        if(missingData === "missing lastname"){await registerPage.registerNewUser(sampleUser.firstname, '', sampleUser.email, sampleUser.password, sampleUser.passwordConfirm);}
        if(missingData === "missing password confirmation"){await registerPage.registerNewUser(sampleUser.firstname, sampleUser.lastname, sampleUser.email, sampleUser.password, '');}
        if(diffPass){await registerPage.registerNewUser(sampleUser.firstname, sampleUser.lastname, sampleUser.email, sampleUser.password, sampleUser.passwordConfirm+'x');}
    }

})