const Discord = require("discord.js");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const { getCommands } = require("./util");
const { Player, QueryType } = require("discord-player");
const { GatewayIntentBits } = require("discord.js");
require("dotenv").config();

// declare intent
// "start": "node leg_bot.js",
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});
const PREFIX = "$";
exports.PREFIX = PREFIX;
let dbName = "grab";
client.on("ready", async () => {
  await mongoose
    .connect(process.env.MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    })
    .then(() => {
      console.log("MONGOOSE ON TEH CASE");
    })
    .catch((err) => {
      console.log(err.message);
    });
  console.log(`Logged in as ${client.user.tag}!`);
});

const commands = getCommands();

client.on("messageCreate", async (msg) => {
  console.log(msg.content);
  // command input handling
  if (msg.content.startsWith(PREFIX)) {
    let [cmdName, ...args] = msg.content.trim().split(/ +/);
    cmdName = cmdName.slice(PREFIX.length).toLowerCase();
    let cmdObj = commands[cmdName];
    console.log(cmdName);
    if (cmdObj) {
      cmdObj.action(msg, args);
      console.log("sendingCommand");
    }
  }

  // random message input handling
  const input = msg.content.toLowerCase();
  if (msg.author.id != 951333435425816627){
    switch(true){
      case input.includes("ping"):
        msg.channel.send("pong");
        break;
      case input.includes("fix"):
        msg.channel.send("ur mom");
        break;
      case input.includes("slay"):
        msg.channel.send("Just a slayer. All I do is slay. Slaying is a full-time job and I dont get paid enough for it.");
        break;
      case input.includes("work"):
        msg.channel.send("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWtsOHo3MnRvMG82cm9zejRuM3FsdnpwMzhoMnR1aDV2a2ZtbW5tbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3uVwawjlGwMMblkI/giphy.gif");
        break;
    }
  }
}); 

client.login(process.env.TOKEN);

// nossir

