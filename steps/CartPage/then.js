const { Then } = require('@wdio/cucumber-framework');
const { assert, expect } = require('chai')
const cartPage = require('../../pageobjects/cart.page')

Then(/(.*) is added to Cart$/, async product => {
    expect(await cartPage.getProductsInCart()).to.be.an('array').and.to.contain(product)
})