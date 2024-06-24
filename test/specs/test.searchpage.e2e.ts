// import SearchPage from '../pageobjects/pages/search.page';
import HomePage from '../pageobjects/pages/home.page';
import SearchPage from '../pageobjects/pages/search.page';

// ToDo: Move to config file
const TIMEOUT_LOAD_PAGE_MS = 5000;

describe('TitanOS Search Page', async () => {
    before('Load Home Page', async () => {
        HomePage.open();

        // Wait until the Watch TV element is loaded on the page
        await HomePage.watchTvElement.waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `Page is not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        });
    });

    it('Can open a category from the search page', async () => {
        await HomePage.menu.navigateTo('Search');
        await SearchPage.categories[0].waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `Search page is not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        });
        await browser.keys(['ArrowDown']);
        await browser.keys(['\uE007']);
        await SearchPage.results[0].waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `Search results are not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        });

        expect(await SearchPage.results.length).toBeGreaterThan(0);
    });

    after('Close browser after test suit', () => {
        browser.closeWindow();
    });
});

