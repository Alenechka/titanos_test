import AppsPage from '../pageobjects/pages/apps.page';
import HomePage from '../pageobjects/pages/home.page';

// ToDo: Move to config file
const TIMEOUT_LOAD_PAGE_MS = 30000;

describe('TitanOS Apps Page', async () => {
    before('Load Home Page', async () => {
        HomePage.open();

        // Wait until the Watch TV element is loaded on the page
        await HomePage.watchTvElement.waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `Page is not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        });
    });

    it('Can add an app to home page favourites apps from apps page', async () => {
        const favouriteAppsBeforeAddition = await HomePage.favouriteAppsNames();

        // Load Apps page
        await HomePage.menu.navigateTo('Apps');
        await AppsPage.appsList[0].waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `Apps page is not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        });

        // Go to the first app
        await browser.keys(['ArrowDown']);
        await browser.keys(['ArrowDown']);
        await browser.keys(['\uE007']);
        await AppsPage.app.addToFavouritesButton[0].waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `App page is not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        }); 

        // Go to Add to Favourites button
        await browser.keys(['ArrowRight']);
        await browser.keys(['ArrowRight']);
        await browser.keys(['\uE007']);

        // Wait until redirected back to Home page
        await HomePage.watchTvElement.waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `Page is not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        });

        const favouriteAppsAfterAddition = await HomePage.favouriteAppsNames();

        expect(favouriteAppsAfterAddition.length).toEqual(favouriteAppsBeforeAddition.length + 1);
    });

    after('Close browser after test suit', () => {
        browser.closeWindow();
    });
})

