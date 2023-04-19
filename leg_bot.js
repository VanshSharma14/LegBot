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
    GatewayIntentBits.GuildBans,
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
  }
   if (msg.content.toLowerCase().includes("ping")) {
      msg.channel.send("pong");
  }
  if (msg.content.toLowerCase().includes("fix")) {
      msg.channel.send("ur mom") 
     //msg.reply(`<@${msg.author.id}>`)
  }
}); 

client.login(process.env.TOKEN);

// nossir

