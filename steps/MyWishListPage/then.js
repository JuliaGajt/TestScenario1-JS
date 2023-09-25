const { Then } = require('@wdio/cucumber-framework');
const { assert, expect } = require('chai')
const myWishListPage = require('../../pageobjects/mywishlist.page')

Then(/successfully added (.*) to Wish List message is visible$/, async product => {
    expect(await myWishListPage.getMsgAddedToWL()).equals(`${product} has been added to your Wish List. Click here to continue shopping.`)
})

Then(/(.*) is added to Wish List$/, async product => {
    assert(await myWishListPage.getProductFromWL(product) !== null)
})