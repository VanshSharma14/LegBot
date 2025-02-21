module.exports = {
    name: "s",
    usage: "s <find>/<replace>",
    description: "find and replace",
    action: async (msg, args) => {
        // check for correct input and define variables
        args = args.join(" ")
        let contents = args;
        let options = contents.split("/")
        if (options.length != 2 || options[0]=="") {
            msg.reply("usage: --s <find>/<replace>")
            return;
        }

        // Messages.values = ["msg1", "msg2"]
        
        await msg.channel.messages.fetch({limit: 10}).then(messages => {
            if (messages.size == 10) {
                const arr = Array.from(messages.values());
                for(let i = 1; i < arr.length; i++) {
                    // use regular expressions
                    
                    if(arr[i].content.includes("--s")){
                        continue;
                    }
                    let regEx = new RegExp(options[0], "gi")
                    if (arr[i].content.search(regEx) >= 0 && !arr[i].author.bot) {
                        let replyMessage = arr[i].content.replace(regEx, options[1])
                        const id = arr[i].author.id
                        replyMessage = `<@${id}>: ${replyMessage}`
                        msg.channel.send(replyMessage)
                        return;
                    }
                }
            }
        })
    }
}

// input: i love unicorns and they are amazing
// output: i love cocks and they are amazing

// $s unicorn/cock