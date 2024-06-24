/**
 * Performs action until condition is met with limited number of retries.
 * 
 * @param action - a callback function
 * @param condition - a callback function returning true or false
 * @param limit - a number of retries
 */
// ToDo: Add fail with message
export async function doActionUntilCondition(action: Function, condition: Function, limit: number) {
    for (let i = 0; i < limit; i++) {
        if (await condition()) {
            break;
        }
        await action();
    }
}

export function getLastPartOfString(value: string, sep: string) {
    const valueParts = value.split(sep);
    return valueParts[valueParts.length - 1];
}