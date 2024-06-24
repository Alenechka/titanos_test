import Page from './page';
import RemoteControlEmulator from '../utils';
import { doActionUntilCondition } from '../utils';

class HomePage extends Page {
    
    get watchTvElement() { return $(`[${this.ATTRIBUTE_TESTID}="Watch TV"]`) };
    get editModeRemoveAppElement() { return $(`[${this.ATTRIBUTE_TESTID}="editmode-remove-app"]`) };
    get favouriteAppsList() { return $$('.//*[@id="me-apps-list"]/div') };

    public open() {
        super.open('/');
    }

    public async load() {
        this.open();

        // Wait until the Watch TV element is loaded on the page
        await this.watchTvElement.waitForExist({
            timeoutMsg: `Home page is not loaded after ${Number(browser.options.waitforTimeout) / 1000} seconds`,
        });
    }

    /**
     * 
     */
    public async deleteFavouriteApp() {
        await RemoteControlEmulator.pressKeyRight();
        await RemoteControlEmulator.pressAndHoldButton(RemoteControlEmulator.BUTTON_OK, 3000);
        await RemoteControlEmulator.pressKeyDown();
        await RemoteControlEmulator.pressOkButton();
    }

    /**
     * 
     */
    public async navigateToFavouriteApps() {
        await doActionUntilCondition(
            async () => { await RemoteControlEmulator.pressKeyDown(); },
            async () => { return (await this.watchTvElement.getAttribute('data-focused')) === 'focused' }
        );
    }
}

export default new HomePage();
