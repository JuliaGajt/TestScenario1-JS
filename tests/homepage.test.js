var async = require("async");

const homePage = require('../pageobjects/home.page');
const registerPage = require('../pageobjects/register.page');
const searchResultPage = require('../pageobjects/searchresult.page');

describe('My home page application', function () {

    it('should take user to Register Page', async () => {

        await homePage.open();
        await homePage.goToRegisterAccountPage();

        expect(await registerPage.getRegistrationLegend()).to.be.an('array').and.deep.equals(['Personal Information', 'Sign-in Information']);
        expect(await browser.getTitle()).equals('Create New Customer Account', "You are on the wrong page");
        expect(await browser.getUrl()).equals(`${browser.options.baseUrl}customer/account/create/`)

    })

    it('should take user to Login Page', async () => {

        await homePage.open();
        await homePage.goToLoginAccountPage();

        expect(await browser.getTitle()).equals('Customer Login', "You are on the wrong page");
        expect(await browser.getUrl()).contains(`${browser.options.baseUrl}customer/account/login/`)

    })

    async.each(['tee', 'hoodie', 'blue'], function(item, callback) {
        it(`should search for ${item}`, async () => {

            await homePage.open();
            await homePage.searchItem(item);

            expect(await browser.getTitle()).equals(`Search results for: '${item}'`, 'You are on the wrong page.')
            expect(await browser.getUrl()).contains(`${browser.options.baseUrl}catalogsearch/result/?q=${item}`)
            expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf.above(0);

            let tableRelated = await searchResultPage.getRelatedSearchTerms();
            expect(await tableRelated).to.be.an('array').and.to.have.lengthOf.above(0);
            await tableRelated.forEach(element => {
                wdioExpect(element).toHaveTextContaining(item, ignoreCase=true)
            });
        })
        callback();
    });

    async.each(['unicorn', 'abcde'], function(item, callback) {
        it(`should get no results for ${item}`, async () => {

            await homePage.open();
            await homePage.searchItem(item);

            expect(await browser.getTitle()).equals(`Search results for: '${item}'`, 'You are on the wrong page.')
            expect(await browser.getUrl()).contains(`${browser.options.baseUrl}catalogsearch/result/?q=${item}`)
            expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf(0);
            expect(await searchResultPage.getNoResultsMessage()).equals("Your search returned no results.")
        })
        callback();
    });


})