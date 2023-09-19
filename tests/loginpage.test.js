var async = require("async");

const myAccountPage = require('../pageobjects/myaccount.page');
const loginPage = require('../pageobjects/login.page');
const loginData = require('../data/logindata')

describe("Login page functionality", () => {


    it("should not login because of invalid data", async () => {

        let user = loginData.loginInvalid;
        
        await loginPage.open()
        expect(await loginPage.getPageTitle()).equals("Customer Login");
        
        await loginPage.login(user.email, user.password);

        expect(await myAccountPage.getPageTitle()).equals("Customer Login");
        expect(await browser.getUrl()).contains(`${browser.options.baseUrl}customer/account/login/`);
        expect(await loginPage.getLoginError()).equals('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    })

    async.each([loginData.loginMissEmail, loginData.loginMissPass, loginData.loginMissPassEmail], function (user, callback) {

        it("should not login because of missing data", async () => {
            
            await loginPage.open()
            expect(await loginPage.getPageTitle()).equals("Customer Login");
            await loginPage.login(user.email, user.password);

            if(user.email === ""){expect(await loginPage.getEmailError()).equals("This is a required field.");}
            if(user.lastname === ""){expect(await loginPage.getPassError()).equals("This is a required field.");}

            expect(await myAccountPage.getPageTitle()).equals("Customer Login");
            expect(await browser.getUrl()).contains(`${browser.options.baseUrl}customer/account/login/`);

        })

        callback();
    });


    it("should login existing user", async () => {

        let user = loginData.loginValid;
        
        await loginPage.open()
        expect(await loginPage.getPageTitle()).equals("Customer Login");

        await loginPage.login(user.email, user.password);
        await myAccountPage.usernameAndEmailInfo.waitForDisplayed()

        expect(await myAccountPage.getPageTitle()).equals("My Account");
        expect(await browser.getUrl()).equals(`${browser.options.baseUrl}customer/account/`);
        expect(await myAccountPage.getUsernameAndEmailInfo()).equals(`${user.userName} ${user.email}`);
    })

});

