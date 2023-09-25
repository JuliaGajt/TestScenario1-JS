const { Then } = require('@wdio/cucumber-framework');
const { assert, expect } = require('chai')
const searchResultPage = require('../../pageobjects/searchresult.page')


Then(/(no )?products should be listed$/, async noProducts => {
    if(noProducts){
        expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf(0);
    } else {
        expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf.above(0);
    }

})

Then(/(no )?related terms to "(.*)" should be listed and contain search term$/, async (noRelated, term) => {

    if(noRelated){
        expect(await searchResultPage.getListOfResults()).to.be.an("array").and.to.have.lengthOf(0);
    }else{
        let tableRelated = await searchResultPage.getRelatedSearchTerms();
        expect(tableRelated).to.be.an('array').and.to.have.lengthOf.above(0);
        
        tableRelated.forEach(element => {
            let ifContain = false;
            term.split(' ').forEach(termWord => {
                if (element.toLowerCase().includes(termWord.toLowerCase())) {
                    ifContain = true;
                }
            });
            assert(ifContain === true);
        });
    }

})

Then(`message "no results" should be visible`, async () => {
    // console.log(await searchResultPage.getNoResultsMessage().getValue())
    expect(await searchResultPage.getNoResultsMessage()).to.contain("Your search returned no results.")
})

Then(/successfully added (.*) to Cart message is visible$/, async product => {
    expect(await searchResultPage.getAddedToCartMsg()).equals(`You added ${product} to your shopping cart.`)
})

Then(/can go to cart with successfully added product link$/, async () => {
    await searchResultPage.goToCartByAddedToCartMsg()
})