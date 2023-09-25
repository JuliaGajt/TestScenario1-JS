const Page = require('./page');

class ProductPage extends Page {

    async open(){
        return await super.open('')
    }

}

module.exports = new ProductPage();