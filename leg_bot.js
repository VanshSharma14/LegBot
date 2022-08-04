const Discord = require("discord.js");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const { getCommands } = require("./util");
const { Player, QueryType } = require("discord-player");
require("dotenv").config();
// declare intent
const intents = new Discord.Intents();
intents.add("GUILDS");
intents.add("DIRECT_MESSAGES");
intents.add("GUILD_MESSAGES");
intents.add("GUILD_MESSAGE_REACTIONS");
intents.add("DIRECT_MESSAGE_REACTIONS");
intents.add("GUILD_MEMBERS");
intents.add("GUILD_BANS");
intents.add("GUILD_VOICE_STATES");

const client = new Discord.Client({ intents: intents });
const PREFIX = "--";
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
  // if (msg.author.bot) {
  //     return;
  // }
  if (msg.content.startsWith(PREFIX)) {
    let [cmdName, ...args] = msg.content.trim().split(/ +/);
    cmdName = cmdName.slice(PREFIX.length).toLowerCase();
    let cmdObj = commands[cmdName];
    console.log(cmdName);
    if (cmdObj) {
      cmdObj.action(msg, args);
      console.log("sendingCommand");
    }

    if (msg.content.toLowerCase().includes("ping")) {
        msg.channel.send("pong");
    }
    if (msg.content.toLowerCase().includes("fix")) {
        msg.channel.send("ur mom")
        //msg.reply(`<@${msg.author.id}>`)
    }
    
}

client.login(process.env.TOKEN);

// nossir
