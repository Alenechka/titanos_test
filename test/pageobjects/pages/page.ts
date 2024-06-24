import { browser } from '@wdio/globals'
import Menu from '../components/menu';

export default class Page {

    public ATTRIBUTE_TESTID = 'data-testid';

    menu: Menu;

    constructor() {
        this.menu = new Menu();
    }

    /**
    * Opens a sub page of the page
    * 
    * @param path path of the sub page
    */
    public open(path: string) {
        browser.url(path);
    }
}