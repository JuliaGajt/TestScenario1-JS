const { When } = require('@wdio/cucumber-framework');
const homePage = require('../../pageobjects/home.page')

When(/the user click on the "(.*)" option in the header$/, async headerOption => { 
    switch(headerOption) {
        case "Sign In":
            await homePage.goToLoginAccountPage();
            break;
        case "Create an Account":
            await homePage.goToRegisterAccountPage();
            break;
        case "My Wish List":
            await homePage.goToWishListPage()
            break;
        case "My Account":
            await homePage.goToMyAccountPage()
            break;
        case "Sign Out":
            await homePage.signOut()
            break;
        default:
            console.log(`There is no option called ${headerOption}`)
    }
})


When(/user seach "(.*)"/, async term => {

    await homePage.searchItem(term)

})
