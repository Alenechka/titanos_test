import RemoteControlEmulator from '../utils';

export default class App {

    get addToFavouritesButton() { return $$('.//div[@id="app-fav-button"]'); };

    public async addAppToFavourites() {
        await RemoteControlEmulator.pressOkButton();
        await this.addToFavouritesButton[0].waitForExist({
            timeoutMsg: `App page is not loaded after ${Number(browser.options.waitforTimeout) / 1000} seconds`,
        }); 

        // Go to Add to Favourites button
        await RemoteControlEmulator.pressKeyRight();
        await RemoteControlEmulator.pressKeyRight();

        await RemoteControlEmulator.pressOkButton();

        // Wait for loading of app addition. Not clear what to wait for.
        await browser.pause(3000);
    }
}