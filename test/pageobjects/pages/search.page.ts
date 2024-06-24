import Page from '../page';

class SearchPage extends Page {

    get categories() { return $$('(.//div[starts-with(@id, "focusable-movie-")])') };
    get results() { return $$('(.//div[starts-with(@data-testid, "list-item-")])') };

    public open() {
        super.open('/');
    }
    
}

export default new SearchPage();