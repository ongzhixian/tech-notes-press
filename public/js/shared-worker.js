const broadcastChannels = {
    'tech_notes_press' : new BroadcastChannel("tech_notes_press"),
    'channel_5' : new BroadcastChannel("channel_5"),
}

function broadcast(message) {
    console.log('in broadcast', message)
    if ((!message.hasOwnProperty('channel')) || (!message.hasOwnProperty('payload'))) return;

    broadcastChannels[message['channel']].postMessage(message.payload);
}

function multiply() {

}

onconnect = (e) => {
    const port = e.ports[0];

    port.addEventListener("message", (e) => {

        console.log(e.data);
        let message = e.data;
        if (!message.hasOwnProperty('type')) return; // Do nothing


        switch (message.type)
        {
            case 'broadcast':
                broadcast(message);
                break;
            case 'multiply':
                multiply(message);
                break;
            default:
                break;
        }


        const workerResult = `Result: ${e.data[0] * e.data[1]}`;
        port.postMessage(workerResult);
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.

    // Sample message
    // let sampleMessage =
    // {
    //     type: 'broadcast',
    //     channel: 'channel-name',
    //     payload: 'payload data'
    // };
    // let actionResult
    // {
    //     action: 'broadcast',
    //     payload: 'payload data'
    // }
};
/* Notes
 *
 * s
 * s
 * ```
 * {
 *
 * }
 *
 * ```
 *
* */