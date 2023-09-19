const Page = require('./page');

class MyWishListPage extends Page {

    get addedToWishListMsg() { return $(`div[data-ui-id='message-success'] > div`);}
    productInWishList(product) { return $(`//a[@title='${product}' and @class='product-item-link']`);}
    
    async load() {
        return super.load('wishlist/')
    }
    
    async getMsgAddedToWL() {
        return await this.addedToWishListMsg.getText();
    }

    async getProductFromWL(product) { 
        return await this.productInWishList(product)
    }

}

module.exports = new MyWishListPage();