const { Given } = require('@wdio/cucumber-framework');
const homePage = require('../../pageobjects/home.page');
const registerPage = require('../../pageobjects/register.page');
const loginPage = require('../../pageobjects/login.page');
const cartPage = require('../../pageobjects/cart.page');
const myAccountPage = require('../../pageobjects/myaccount.page');
const myWishListPage = require('../../pageobjects/mywishlist.page');
const searchResultPage = require('../../pageobjects/searchresult.page')

Given(/the browser is at "(.*)" page$/, async page => {

    switch (true) {
        case page === "Home":
            await homePage.open();
            break;
        case page === "Sign In":
            // delete all cookies to log out user if there is one
            // so page is properly loaded
            await browser.deleteAllCookies()
            await loginPage.open();
            break;
        case page === "Create an Account":
            // delete all cookies to log out user if there is one
            // so page is properly loaded
            await browser.deleteAllCookies()
            await registerPage.open();
            break;
        case page === "Cart":
            await cartPage.open();
            break;
        case page === "My Account":
            await myAccountPage.open();
            break;
        case page === "My Wish List":
            await myWishListPage.open();
            break;
        case page.includes('Search Results for'):
            await searchResultPage.open(page.slice(19,page.length))
            break;
        default:
            console.log(`Invalid Page ${page}`);
            break;
    }

    browser.waitUntil(() => browser.execute(
        () => document.readyState === 'complete'),
        {
          timeout: 60 * 1000, // 60 seconds
          timeoutMsg: 'Page hasn\'t been loaded.'
        }
    );

})
