const Discord = require("discord.js")
const { getCommands } = require("./util")
require("dotenv").config()
// declare intent
const intents = new Discord.Intents()
intents.add("GUILDS")
intents.add("DIRECT_MESSAGES")
intents.add("GUILD_MESSAGES")
intents.add("GUILD_MESSAGE_REACTIONS")
intents.add("DIRECT_MESSAGE_REACTIONS")
intents.add("GUILD_MEMBERS")
intents.add("GUILD_BANS")

const client = new Discord.Client({intents: intents})
const PREFIX = "--"
exports.PREFIX = PREFIX;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
}) 

const commands = getCommands();




client.on("messageCreate", async msg => {
    console.log(msg.content)
    if (msg.author.bot) {
        return;
    }
    if (msg.content.startsWith(PREFIX)) {
        let [cmdName, ...args] = msg.content.trim().split(/ +/);
        cmdName = cmdName.slice(PREFIX.length).toLowerCase();
        let cmdObj = commands[cmdName]
        console.log(cmdName);
        if (cmdObj){
            cmdObj.action(msg, args)
            console.log("sendingCommand")
        }
    }
    if (msg.content.includes("ping")) {
        msg.reply("pong");
    }
    if (msg.content.includes("fix")) {
        msg.reply("ur mom")
    }
    
})

client.login(process.env.TOKEN)
 
// 

