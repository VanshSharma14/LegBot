// Description: This file contains utility functions that are used in the bot.

const fs = require('fs')
const path = require("path");

const messageChecks = [];
const checksPath = path.join(__dirname, "messageChecks");
const checkFiles = fs.readdirSync(checksPath).filter(file => file.endsWith(".js"));

for (const file of checkFiles) {
    const check = require(path.join(checksPath, file));
    // If it has a run function, add it to our list
    if (typeof check.run === "function") {
        messageChecks.push(check);
    }
}

// define a method that gets all commands into one object. [Array of objects]
exports.getCommands = () => {
    const commands = {}
    const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js')) // ["get_leage_state.js", "smth.js"]
    for (const f of commandFiles)
    {
        const commandObj = require(`./commands/${f}`) // require("./commands/get_leage_stats.js")
        commands[commandObj.name] = commandObj;
    } 

    return commands
}

// Define a function to get a random choice from an array
exports.pickRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

exports.checkMessage = (msg) => {
    // gonna call a buncha functions with message parameters and then implement them in the data/ folder
    for (const check of messageChecks) {
        check.run(msg);
    }
}