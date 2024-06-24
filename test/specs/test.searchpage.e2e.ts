import HomePage from '../pageobjects/pages/home.page';
import SearchPage from '../pageobjects/pages/search.page';
import RemoteControlEmulator from '../pageobjects/utils';

describe('TitanOS Search Page', async () => {
    before('Load Home Page', async () => {
        await HomePage.load();
    });

    it('Can open a category from the search page', async () => {
        await SearchPage.load();
        
        await RemoteControlEmulator.pressKeyDown();
        await RemoteControlEmulator.pressOkButton();
        await SearchPage.searchResults[0].waitForExist({
            timeoutMsg: `Search results are not loaded after ${Number(browser.options.waitforTimeout) / 1000} seconds`,
        });

        expect(await SearchPage.searchResults.length).toBeGreaterThan(0);
    });

    after('Close browser after test suit', () => {
        browser.closeWindow();
    });
});

