var async = require("async");

const myAccountPage = require('../pageobjects/myaccount.page');
const registerPage = require('../pageobjects/register.page');
const registerData = require('../data/registerdata')



describe("Register page functionality", () => {

    async.each([registerData.registerUserMissingDataFail1, registerData.registerUserMissingDataFail2], function (user, callback) { 
        it("should not register new user because of missing data", async () => {

            await registerPage.open()
            expect(await registerPage.getPageTitle()).equals("Create New Customer Account");
            await registerPage.registerNewUser(user.firstname, user.lastname, user.email, user.password, user.passwordConfirm)

            expect(await registerPage.getPageTitle()).equals("Create New Customer Account");
            expect(await browser.getUrl()).equals(`${browser.options.baseUrl}customer/account/create/`);
            
            if(user.firstname === ""){expect(await registerPage.getFirstnameError()).equals("This is a required field.");}
            if(user.lastname === ""){expect(await registerPage.getLastnameError()).equals("This is a required field.");}
            if(user.email === ""){expect(await registerPage.getEmailError()).equals("This is a required field.");}
            if(user.password === ""){expect(await registerPage.getPasswordError()).equals("This is a required field.");}
            if(user.passwordConfirm === ""){expect(await registerPage.getPasswordConfirmError()).equals("This is a required field.");}

        })
        callback();
    });

    it("should not register new user because it already exist", async () => {

        let user = registerData.registerUserAlreadyExistFail;
        
        await registerPage.open()
        expect(await registerPage.getPageTitle()).equals("Create New Customer Account");
        await registerPage.registerNewUser(user.firstname, user.lastname, user.email, user.password, user.passwordConfirm)

        expect(await registerPage.getPageTitle()).equals("Create New Customer Account");
        expect(await browser.getUrl()).equals(`${browser.options.baseUrl}customer/account/create/`);
        expect(await registerPage.getErrorMessageUserExist()).equals("There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.")

    })

    it("should not register new user because passwords differ", async () => {

        let user = registerData.registerUserPasswordsDifferFail;

        await registerPage.open()
        expect(await registerPage.getPageTitle()).equals("Create New Customer Account");
        await registerPage.registerNewUser(user.firstname, user.lastname, user.email, user.password, user.passwordConfirm)

        expect(await registerPage.getPageTitle()).equals("Create New Customer Account");
        expect(await browser.getUrl()).equals(`${browser.options.baseUrl}customer/account/create/`);
        expect(await registerPage.getErrorPasswordsDiffer()).equals("Please enter the same value again.")

    })

    it("should register new user to the system", async () => {

        let user = registerData.registerUserSuccess;

        await registerPage.open()
        expect(await registerPage.getPageTitle()).equals("Create New Customer Account");

        await registerPage.registerNewUser(user.firstname, user.lastname, user.email, user.password, user.passwordConfirm)

        expect(await myAccountPage.getUsernameAndEmailInfo()).equals(`${user.firstname} ${user.lastname} ${user.email}`);
        expect(await myAccountPage.getSuccessfulRegisterMessage()).equals("Thank you for registering with Main Website Store.")
        expect(await myAccountPage.getPageTitle()).equals("My Account");
        expect(await browser.getUrl()).equals(`${browser.options.baseUrl}customer/account/`);
        
    })

})        
