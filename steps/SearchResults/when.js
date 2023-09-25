const { When } = require('@wdio/cucumber-framework');
const searchResultPage = require('../../pageobjects/searchresult.page');

When(/adding (.*) to Wish List$/, async product => {
    await searchResultPage.addProductToWishList(product)
})

When(/adding (.*) size: (XS|S|M|L|XL) color: (.*), to Cart$/, async (product, size, color) => {
    await searchResultPage.addProductToCart(product, size, color);
})

When(/clicking (.*) card$/, async product => {
    await searchResultPage.gotToProductPage(product)
})