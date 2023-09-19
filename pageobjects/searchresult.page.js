const { Key } = require('webdriverio');
const Page = require('./page');

class SearchResultPage extends Page {

    get resultsOfSearching () { return $$('li[class="item product product-item"]');}
    
    get relatedSearchTerms () { return $$('div[class="search results"] dd > a');}
    get noResultsMessage () { return $('div[class*="notice"] > div');}
    
    addProductToWishListBtn(product) { return $(`//a[contains(.,'${product}')]/parent::*/following-sibling::div[@class='product-item-inner']//a[@title='Add to Wish List']`);}
    addProductToCartBtn (product) { return $(`//a[contains(.,'${product}')]/parent::*/following-sibling::div[@class='product-item-inner']//button[@title='Add to Cart']`);}

    get addedToCartMsg () { return $('div[data-ui-id="message-success"] > div');}
    get addedToCartMsgCartLink () { return $('//a[.="shopping cart"]');}
    
    productLink (product) { return $(`img[class='product-image-photo'][alt='${product}']`);}
    productCard (product) { return $(`//strong[contains(.,'${product}')]//ancestor::div[@class="product-item-info"]`);}

    selectSizeOfProdBtn(product, size) {return $(`//strong[contains(.,'${product}')]//ancestor::div[@class="product-item-info"]//div[contains(@id,'option-label-size') and @option-label='${size}']`)}
    selectColorOfProdBtn(product, color) { return $(`//strong[contains(.,'${product}')]//ancestor::div[@class="product-item-info"]//div[contains(@id,'option-label-color') and @option-label='${color}']`)}

    async open(product) {
        await super.open(`catalogsearch/result/?q=${product}`)
    }

    async getListOfResults() {
        return await this.resultsOfSearching;
    }

    /**
     * Returns strings of links to related searches.
     * @returns {[string]}
     */
    async getRelatedSearchTerms() {
        return await this.relatedSearchTerms.map(async term => {return await term.getText();});
    }

    /**
     * Returns notification that no results were found.
     * @returns {string}
     */
    async getNoResultsMessage() {
        await this.noResultsMessage.waitForDisplayed()
        return await this.noResultsMessage.getText();
    }

    /**
     * Function that is adding given product to Wish List.
     * It is important to provide exact name of product (case sensitive).
     * Methoid doesn't check if user is logged in.
     * @param {string} product
     */
    async addProductToWishList(product){

        await this.productCard(product).waitForDisplayed()
        await this.productCard(product).scrollIntoView()
        await this.productCard(product).moveTo()

        await this.addProductToWishListBtn(product).waitForDisplayed()
        await this.addProductToWishListBtn(product).moveTo()
        await this.addProductToWishListBtn(product).click()

    }

    /**
     * Method is adding product with given size and color to cart] and go back to top of page.
     * It doesn't check if user is logged in. 
     * @param {string} product 
     * @param {string} size - XS, S, M, L, XL
     * @param {string} color - depending od product 
     */
    async addProductToCart(product, size, color){
        
        await this.productCard(product).waitForDisplayed()
        await this.productCard(product).scrollIntoView()

        if(size != ''){
            await this.selectSizeOfProdBtn(product, size).waitForDisplayed()
            await this.selectSizeOfProdBtn(product, size).click()
        }
        if(color != ''){
            await this.selectColorOfProdBtn(product, color).waitForDisplayed()
            await this.selectColorOfProdBtn(product, color).click()
        }
        await this.addProductToCartBtn(product).click()
        await browser.keys([Key.Ctrl, Key.Home])
    }

    async getAddedToCartMsg() { return await this.addedToCartMsg.getText()}
    async goToCartByAddedToCartMsg() { return await this.addedToCartMsgCartLink.click()}
    async gotToProductPage(product) { await this.productLink(product).click()}

}

module.exports = new SearchResultPage();