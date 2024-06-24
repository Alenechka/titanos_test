import HomePage from '../pageobjects/pages/home.page';

describe('TitanOS Home Page', async () => {
    before('Load Home Page', async () => {
        await HomePage.load();
    });

    it('Can delete apps in the home page favourite apps row', async () => {
        const favouriteAppsBeforeDeletion = await HomePage.favouriteAppsList;

        await HomePage.navigateToFavouriteApps();
        await HomePage.deleteFavouriteApp();

        const favouriteAppsAfterDeletion = await HomePage.favouriteAppsList;

        expect(favouriteAppsAfterDeletion.length).toEqual(favouriteAppsBeforeDeletion.length - 1);
    });

    after('Close browser after test suit', () => {
        browser.closeWindow();
    });
});

