const Page = require('./page');

class CartPage extends Page {

    get productsInCart() {return $$(`//*[@class='product-item-name']/a[not(@data-bind)]`)}

    async load() {
        return super.load('checkout/cart/')
    }

    async getProductsInCart() {
        return await this.productsInCart.map(async product => {return await product.getText()})
    }

}

module.exports = new CartPage();