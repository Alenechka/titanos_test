import { browser } from '@wdio/globals'
import Menu from './components/menu';

export default class Page {

    public ATTRIBUTE_DATA_TESTID = 'data-testid';

    menu: Menu;

    constructor() {
        this.menu = new Menu();
    }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open (path: string) {
        browser.url(path);
    }

    /**
     * 
     * @param buttonKey 
     * @param holdTime 
     */
    public async pressAndHoldButton(buttonKey: string, holdTime: number) {
        await browser.performActions([{
            type: 'key',
            id: 'keyboard',
            actions: [
                { type: 'keyDown', value: buttonKey }, 
                { type: 'pause', duration: holdTime }, 
                { type: 'keyUp', value: buttonKey }
            ]
        }]);
        
        await browser.releaseActions();
    }

        /**
     * 
     * @param buttonKey 
     * @param time 
     */
    public async pressButton(buttonKey: string) {
        await browser.performActions([{
            type: 'key',
            id: 'keyboard',
            actions: [
                { type: 'keyDown', value: buttonKey }, 
                { type: 'keyUp', value: buttonKey }
            ]
        }]);
        
        await browser.releaseActions();
    }
}