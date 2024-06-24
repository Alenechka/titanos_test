import HomePage from '../pageobjects/pages/home.page'

// ToDo: Move to config file
const TIMEOUT_LOAD_PAGE_MS = 30000;

describe('TitanOS Home Page', async () => {
    before('Load Home Page', async () => {
        await HomePage.open();

        // Wait until the Watch TV element is loaded on the page
        await HomePage.watchTvElement.waitForExist({
            timeout: TIMEOUT_LOAD_PAGE_MS,
            timeoutMsg: `Page is not loaded after ${TIMEOUT_LOAD_PAGE_MS / 1000} seconds`,
        });

        HomePage.activate();
    });

    it('Can delete apps in the home page favourite apps row', async () => {
        const favouriteAppsBeforeDeletion = await HomePage.favouriteAppsNames();

        await HomePage.navigateToFavouriteApps();
        await HomePage.deleteFavouriteApp();

        const favouriteAppsAfterDeletion = await HomePage.favouriteAppsNames();

        expect(favouriteAppsAfterDeletion.length).toEqual(favouriteAppsBeforeDeletion.length - 1);
    });

    after('Close browser after test suit', () => {
        browser.closeWindow();
    });
})

