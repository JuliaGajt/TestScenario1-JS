const { Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai')

Then(/the title of the page should be "(.*)"$/, async title => {

  browser.waitUntil(() => browser.execute(
    () => document.readyState === 'complete'),
    {
      timeout: 60 * 1000, // 60 seconds
      timeoutMsg: 'Page hasn\'t been loaded.'
    }
);
    expect(await browser.getTitle()).equals(title, `Title ${browser.getTitle()} is not equal to ${title}`)
    
})