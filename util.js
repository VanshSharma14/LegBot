// import fs
//const { DefaultMessageNotificationLevels } = require('discord.js/typings/enums')
//const { setDefaultResultOrder } = require('dns')
const fs = require('fs')

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