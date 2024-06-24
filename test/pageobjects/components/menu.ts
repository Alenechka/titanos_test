import { doActionUntilCondition, getLastPartOfString } from "../utils";
import RemoteControlEmulator from '../utils';

export default class Menu {

    get items() { return $$('.//div[starts-with(@data-testid, "main-menu-item-")]') };
    get focusedMenuItem() { return $$('//div[starts-with(@data-testid, "main-menu-item-") and @data-focused="focused"]') };

    /**
     * If menu is not is focus, move focus to it.
     */
    async focus() {
        await doActionUntilCondition(
            async () => await RemoteControlEmulator.pressKeyUp(),
            async () => {
                return (await this.items).some( async (e) => await e.getAttribute('data-focused') === 'focused' );
            },
            10
        );
    }

    /**
     * 
     * @param menuItem 
     */
    async navigateTo(target: string) {
        this.focus();
        
        let focusedItemIdx = -1;
        let targetItemIdx = -1;

        for(const item of await this.items) {
            const idx = getLastPartOfString(await item.getAttribute('id'), '-');
            const name = getLastPartOfString(await item.getAttribute('data-testid'), '-');

            if (target === name) {
                targetItemIdx = Number(idx);
            }

            if (await item.getAttribute('data-focused') === 'focused') {
                focusedItemIdx = Number(idx);
            }
        }

        let move: Function;
        if (focusedItemIdx < targetItemIdx) {
            move = RemoteControlEmulator.pressKeyRight;
        } else if (focusedItemIdx > targetItemIdx) {
            move = RemoteControlEmulator.pressKeyLeft;
        }

        // Go to menu item
        await doActionUntilCondition(
            async () => await move(),
            async () => {
                const focused = await this.focusedMenuItem[0].getAttribute('data-testid');
                const focusedItemName = getLastPartOfString(focused, '-');
                return (target === focusedItemName);
            },
            10
        );
        
        // Click on menu item
        await RemoteControlEmulator.pressOkButton();
    }
}