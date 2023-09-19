const Page = require('./page');

class ProductPage extends Page {

    async load(){
        return await super.load('')
    }

    

}

module.exports = new ProductPage();