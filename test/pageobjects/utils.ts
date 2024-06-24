/**
 * Performs action until condition is met with limited number of retries.
 * 
 * @param action - a callback function
 * @param condition - a callback function returning true or false
 * @param limit - a number of retries
 */
export async function doActionUntilCondition(action: Function, condition: Function, limit: number = 10) {
    for (let i = 0; i < limit; i++) {
        if (await condition()) {
            break;
        }
        await action();
    }
}

/**
 * Splits the input string by the specified separator and returns the last part.
 *
 * @param {string} value - The input string to split.
 * @param {string} sep - The separator to use for splitting the string.
 * @returns {string} The last part of the split string.
 */
export function getLastPartOfString(value: string, sep: string) {
    const valueParts = value.split(sep);
    return valueParts[valueParts.length - 1];
}

/**
 * Class to incapsulate press button actions.
 */
class RemoteControlEmulator {
    public BUTTON_OK = '\uE007';  // Keyboard key Enter

    public async pressKeyUp() {
        await browser.keys(['ArrowUp']);
    }

    public async pressKeyDown() {
        await browser.keys(['ArrowDown']);
    }

    public async pressKeyLeft() {
        await browser.keys(['ArrowLeft']);
    }

    public async pressKeyRight() {
        await browser.keys(['ArrowRight']);
    }

    public async pressOkButton() {
        await browser.keys([this.BUTTON_OK]);  
    }
    
    /**
     * Simulates pressing and holding a button key for a specified duration.
     *
     * @param {string} buttonKey - The key to press and hold.
     * @param {number} holdTime - The duration to hold the key, in milliseconds.
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
}

export default new RemoteControlEmulator();