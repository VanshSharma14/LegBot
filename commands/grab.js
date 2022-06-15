

module.exports = {
    name: "grab",
    usage: "grab <@user-optional>",
    description: "choose between one or more options",
    action: async (msg, args) => {
        args = args.join(" ")
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