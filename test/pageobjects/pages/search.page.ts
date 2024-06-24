import Page from './page';

class SearchPage extends Page {

    get searchCategories() { return $$('(.//div[starts-with(@id, "focusable-movie-")])') };
    get searchResults() { return $$('(.//div[starts-with(@data-testid, "list-item-")])') };

    public open() {
        super.open('/');
    }
    
    public async load() {
        this.menu.navigateTo('Search');
        await this.searchCategories[0].waitForExist({
            timeoutMsg: `Search page is not loaded after ${Number(browser.options.waitforTimeout) / 1000} seconds`,
        });
    }
}

export default new SearchPage();