import { expect, test, describe } from '@jest/globals';
import { handler } from '../src/handler';

test('hello', async () => {
    const event = {
        body: JSON.stringify({
            requestId: "6894439706274654512",
            inputs: [
                {
                    intent: "action.devices.SYNC"
                }
            ]
        })
    }

    const value = handler(event, undefined);
    console.log(value)

})

