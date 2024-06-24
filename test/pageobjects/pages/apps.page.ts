import App from '../components/app';
import Page from './page';
import RemoteControlEmulator from '../utils';

class AppsPage extends Page {

    app: App;

    get appsList() { return $$('(.//div[starts-with(@data-testid, "list-item-app_list-")])') };

    constructor() {
        super();
        
        this.app = new App();
    }

    public open() {
        super.open('/');
    }

    public async load() {
        this.menu.navigateTo('Apps');
        await this.appsList[0].waitForExist({
            timeoutMsg: `Apps page is not loaded after ${Number(browser.options.waitforTimeout) / 1000} seconds`,
        });
    }

    public async navigateToFeaturedApps() {
        await RemoteControlEmulator.pressKeyDown();
        await RemoteControlEmulator.pressKeyDown();
    }
}

export default new AppsPage();