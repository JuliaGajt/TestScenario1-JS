
module.exports = class Page {

    get notLoggedWelcome() { return $('span[class="not-logged-in"]');}

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`${browser.options.baseUrl}${path}`)
    }

    async getPageTitle() {
        return await browser.getTitle();
    }

}
