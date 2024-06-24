import { doActionUntilCondition, getLastPartOfString } from "../utils";

export default class Menu {

    get items() { return $$('(.//div[starts-with(@data-testid, "main-menu-item-")])') };

    /**
     * If menu is not is focus, move focus to it.
     */
    async focus() {
        let items = await this.items;

        await doActionUntilCondition(
            async () => {
                await browser.keys(['ArrowUp']);
                items = await this.items;
            },
            async () => {
                return items.some( async (e) => await e.getAttribute('data-focused') === 'focused' );
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

        let moveDirection = '';
        if (focusedItemIdx < targetItemIdx) {
            moveDirection = 'ArrowRight';
        } else if (focusedItemIdx > targetItemIdx) {
            moveDirection = 'ArrowLeft';
        }

        // Go to menu item
        // ToDo: Refactor this bullshit condition
        await doActionUntilCondition(
            async () => {
                await browser.keys([moveDirection]);
            },
            async () => {
                return (await this.items).some( async (e) => (await e.getAttribute('data-focused') === 'focused' && getLastPartOfString(await e.getAttribute('data-testid'), '-') === target) );
            },
            10
        );
        
        // Click on menu item
        await browser.keys(['\uE007']);
    }
}