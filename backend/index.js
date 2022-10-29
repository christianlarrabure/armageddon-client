const net = require("net");
const { ipcMain } = require("electron");

const topicRoutes = require("./routes/topics");

let moo;
function connectToMUD(client) {
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
  client.send("moo-connection-status", 1); // CONNECTING
  moo = connectToMUD(client);

  ipcMain.on("moo-connect", () => {
    moo.destroy();
    moo = connectToMUD(client);
  });

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
  console.log(event.sender);
  connect(event.sender);
  topicRoutes.init();
}

function sendInput(text) {
  console.log("Sending..." + text + " to " + moo);
  moo.write(`${text}\r\n`, "utf8");
}

function isPrompt(text, client) {
  // prompt %h/%H %m/%M %v/%V %t/%T %x/%X [%l] [%L] [%n] [%i] [%s] [%S] [%f] [%o] [%a] [%k] [%w] [%A] [%O] [%e] [%E] [%d] [%p] [%P] [%c] [%R] [%u] [%U] [%q]
  const prompt = new RegExp(
    /([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\]/
  );
  const result = prompt.exec(text);
  if (result === null) {
    return null;
  } else {
    client.send("prompt", {
      hp: result[1],
      maxHp: result[2],
      mana: result[3],
      maxMana: result[4],
      stamina: result[5],
      maxStamina: result[6],
      stun: result[7],
      maxStun: result[8],
      focus: result[9],
      maxFocus: result[10],
      longDescriptionStatus: result[11],
      longDescription: result[12],
      name: result[13],
      visibility: result[14],
      position: result[15],
      verbosePosition: result[16],
      flying: result[17],
      language: result[18],
      accent: result[19],
      mount: result[20],
      speed: result[21],
      armed: result[22],
      mood: result[23],
      time: result[24],
      encumberance: result[25],
      day: result[26],
      scan: result[27],
      listen: result[28],
      stance: result[29],
      drunk: result[30],
      hunger: result[31],
      thirst: result[32],
      combatQuit: result[33],
    });
    return text.replace(prompt, "");
  }
}

module.exports = { init, sendInput };
