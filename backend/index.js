const net = require('net');
const Convert = require('ansi-to-html');
const convert = new Convert();

let moo;

function connect(client) {
    moo = net.connect({'host':'ginka.armageddon.org', 'port': '4050'}, (err) => {
        if(err) {
            client.send("is-connected", false);
            client.send("message", "Failed to connect to Armageddon.\r\n");
            return;
        } else {
            client.send("is-connected", true);
            client.send('message', "Connected to Armageddon.\r\n");
        }
    });

    moo.setKeepAlive(true, 120000);

    moo.on('data', (data)=> {
        try {
            data = data.toString();
            console.log(data);
            client.send('message', data);
        } catch (e) {
            client.send('error', e);
            console.error(e);
        }
    })

    moo.on('end', () => {
        client.send('is-connected', false);
        client.send('message', 'Disconnected from Armageddon.\r\n');
    })

    moo.on('error', (error)=>{
        client.send('error', error);
        console.error(error);
    })
}

function init(event) {
    console.log(event.sender);
    connect(event.sender);
}

function sendInput(text) {
    console.log("Sending..." + text + ' to ' + moo);
    moo.write(`${text}\r\n`, "utf8");
}

module.exports = { init, sendInput };
