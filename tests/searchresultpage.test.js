const searchResultPage = require('../pageobjects/searchresult.page');
const loginPage = require('../pageobjects/login.page');
const productPage = require('../pageobjects/product.page');
const myWishListPage = require('../pageobjects/mywishlist.page');
const cartPage = require('../pageobjects/cart.page');
const myAccountPage = require('../pageobjects/myaccount.page')

const loginData = require("../data/logindata")
const productData = require("../data/productdata")

const async = require("async");


describe("Search result page functionality", () => {

    it("should not add ite to wish list - user not logged", async () => {

        await searchResultPage.open(productData.product1.searchTerm)
        expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf.above(0);

        await searchResultPage.addProductToWishList(productData.product1.name)

        expect(await loginPage.getPageTitle()).equals('Customer Login')
        expect(await loginPage.getErrorMessageWishList()).equals('You must login or register to add items to your wishlist.')

    })


    async.each([productData.product1, productData.product2, productData.product3, productData.product4], function (product, callback) {
        it('should add product to cart - user not logged', async () => {

            await searchResultPage.open(product.searchTerm)
            expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf.above(0);
    
            await searchResultPage.addProductToCart(product.name, product.size, product.color)
    
            expect(await searchResultPage.getPageTitle()).equals(`Search results for: '${product.searchTerm}'`)
            expect(await searchResultPage.getAddedToCartMsg()).equals(`You added ${product.name} to your shopping cart.`)
            
            await searchResultPage.goToCartByAddedToCartMsg()
            expect(await cartPage.getProductsInCart()).to.be.an('array').and.to.contain(product.name)
    
        })
        callback();

    })


    async.each([productData.product1, productData.product2, productData.product3, productData.product4], function (product, callback) {
        it("should add product to wish list - user is logged", async () => {

            await browser.deleteAllCookies()
            await loginPage.open()
            await loginPage.login(loginData.loginValid.email, loginData.loginValid.password)
            expect(await myAccountPage.getPageTitle()).equals("My Account");
            

            await searchResultPage.open(product.searchTerm)
            expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf.above(0);

            await searchResultPage.addProductToWishList(product.name)

            expect(await myWishListPage.getPageTitle()).equals(`My Wish List`)
            expect(await myWishListPage.getMsgAddedToWL()).equals(`${product.name} has been added to your Wish List. Click here to continue shopping.`)
            assert(await myWishListPage.getProductFromWL(product.name) !== null)
        })
        callback();
    })


    async.each([productData.product1, productData.product2, productData.product3, productData.product4], function (product, callback) {

        it('should add product to cart - user is logged', async () => {

            await searchResultPage.open(product.searchTerm)
            expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf.above(0);

            await searchResultPage.addProductToCart(product.name, product.size, product.color)

            expect(await searchResultPage.getPageTitle()).equals(`Search results for: '${product.searchTerm}'`)
            expect(await searchResultPage.getAddedToCartMsg()).equals(`You added ${product.name} to your shopping cart.`)
            
            await searchResultPage.goToCartByAddedToCartMsg()
            expect(await cartPage.getProductsInCart()).to.be.an('array').and.to.contain(product.name)

        })
        callback();
    })

    it('should move user to product page', async () => {

        let product = productData.product3;

        await searchResultPage.open(product.searchTerm)
        expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf.above(0);

        await searchResultPage.gotToProductPage(product.name)

        expect(await productPage.getPageTitle()).equals(product.name)

    })


})