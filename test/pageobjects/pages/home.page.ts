import Page from '../page';

class HomePage extends Page {
    
    get watchTvElement() { return $(`[${this.ATTRIBUTE_DATA_TESTID}="Watch TV"]`) };
    get editModeRemoveAppElement() { return $(`[${this.ATTRIBUTE_DATA_TESTID}="editmode-remove-app"]`) };
     
    public async favouriteAppsNames() {
        const favouriteApps = await $$('.//*[@id="me-apps-list"]/div');

        return favouriteApps.map((e) => { return e.getAttribute('data-testid') });
    }

    public open() {
        return super.open('/');
    }

    /**
     * Press key down once to activate remote control focus
     */
    public async activate() {
        await this.pressKeyDown();
    };

    public async pressKeyDown() {
        await browser.keys(['ArrowDown']);
    }

    public async pressKeyRight() {
        await browser.keys(['ArrowRight']);
    }

    /**
     * 
     */
    public async deleteFavouriteApp() {
        await this.pressKeyRight();
        await this.pressAndHoldButton('\uE007', 2000);  // ToDo: Find a way how not hardcode key code
        await this.pressKeyDown();
        await browser.keys('\uE007');
    }

    public async navigateToFavouriteApps() {
        let isWatchTvFocused = (await this.watchTvElement.getAttribute('data-focused')) === 'focused';

        // ToDo: Refactor iterations limit
        let cnt = 0;
        while (!isWatchTvFocused && cnt < 10) {
            await this.pressKeyDown();
            isWatchTvFocused = (await this.watchTvElement.getAttribute('data-focused')) === 'focused';
            cnt++;
        }
    }
}

export default new HomePage();
