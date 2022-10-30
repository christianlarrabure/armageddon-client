const net = require("net");
const { ipcMain } = require("electron");

const topicRoutes = require("./routes/topics");
const topicPriceRoutes = require("./routes/topicPrice");

let moo;
function connectToMUD(client) {
  console.log("ConnectToMUD raised");

  client.send("moo-connection-status", 1); // CONNECTING

  return net.connect({ host: "ginka.armageddon.org", port: "4050" }, (err) => {
    if (err) {
      client.send("moo-connection-status", 0); // DISCONNECTED.
      client.send("message", "Failed to connect to Armageddon.\r\n");
      return;
    } else {
      client.send("moo-connection-status", 2); // CONNECTED.
      client.send("message", "Connected to Armageddon.\r\n");
    }
  });
}

function connect(client) {
  moo = connectToMUD(client);

  moo.setKeepAlive(true, 120000);

  moo.on("data", (data) => {
    try {
      data = data.toString();
      console.log([data]);
      /* const cleanMsg = isPrompt(data, client);
      if (cleanMsg !== null) {
        data = cleanMsg;
      } */
      client.send("message", data);
    } catch (e) {
      client.send("error", e);
      console.error(e);
    }
  });

  moo.on("end", () => {
    client.send("moo-connection-status", 0); // DISCONNECTED.
    client.send("message", "Disconnected from Armageddon.\r\n");
  });

  moo.on("error", (error) => {
    client.send("error", error);
    console.error(error);
  });
}

function init(event) {
  connect(event.sender);

  ipcMain.on("moo-connect", () => {
    console.log("Reconnecting.");
    if (moo) moo.destroy();
    connect(event.sender);
  });

  topicRoutes.init();
  topicPriceRoutes.init();
}

function sendInput(text) {
  console.log("Sending..." + text + " to " + moo);
  moo.write(`${text}\r\n`, "utf8");
}

module.exports = { init, sendInput };
