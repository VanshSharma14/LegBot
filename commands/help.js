const { MessageEmbed } = require("discord.js");
const { PREFIX } = require("../leg_bot");
const { getCommands } = require("../util")

// List all the commands the bot has.
module.exports = {
    name: "help",
    usage: "help <optional>",
    description: "lists all commands or the usage of a specific command",
    action: (msg, args) => {
        const commands = getCommands();
        let content = args
        if (content.length == 1){
            console.log(content)
            cmdObj = commands[content[0]]
            if (cmdObj) {
                let commandsEmbed = new MessageEmbed()
                    .setColor("AQUA")
                    .setTitle("*" + cmdObj.name + "*")
                    .addField("Usage", PREFIX + cmdObj.usage)
                    .addField("Description", cmdObj.description)
                msg.channel.send({embeds: [commandsEmbed] })
            } else {
                msg.channel.send("Invalid command. Use --help for a list of all commands")
            }
        } else if (args.length == 0) {
            let arr = []
            for(let cmdName in commands) {
                arr.push("`"+commands[cmdName].usage+"`")
            }
            let commandsEmbed = new MessageEmbed()
                .setColor("#5432a8")
                .setTitle("LegBot Commands")
                .setDescription(`use ${PREFIX} before every command. '<parameter>'
                 denotes parameters that are usually required with the command. 
                 You could also use ${PREFIX}Help <command_name> for usage and description.`)
                .addField("Commands", arr.join("\n"));
            msg.channel.send({ embeds: [commandsEmbed] })
        }
        
        
    }
}