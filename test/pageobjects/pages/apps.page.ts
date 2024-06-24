import App from '../components/app';
import Page from '../page';

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
    
}

export default new AppsPage();