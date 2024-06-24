import AppsPage from '../pageobjects/pages/apps.page';
import HomePage from '../pageobjects/pages/home.page';

describe('TitanOS Apps Page', async () => {
    before('Load Home Page', async () => {
        await HomePage.load();
    });

    it('Can add an app to home page favourites apps from apps page', async () => {
        const favouriteAppsBeforeAddition = await HomePage.favouriteAppsList;

        await AppsPage.load();
        await AppsPage.navigateToFeaturedApps();
        await AppsPage.app.addAppToFavourites();

        // Reload Home page
        await HomePage.load();

        const favouriteAppsAfterAddition = await HomePage.favouriteAppsList;

        expect(favouriteAppsAfterAddition.length).toEqual(favouriteAppsBeforeAddition.length + 1);
    });

    after('Close browser after test suit', () => {
        browser.closeWindow();
    });
});

