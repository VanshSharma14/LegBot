const fetch = require('node-fetch');


module.exports = {
    name: "shorten",
    usage: "shorten <URL>",
    description: "shorten any url",
    action: async (msg, args) => {
        if (args.length != 1){
        msg.channel.send("Usage: --shorten <URL>")
        return
        }
        const request = { value: args[0], group: "link" }
        try {
        const response = await fetch("https://pym.jchun.me/api/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        });
        const data = await response.json();
        url = `https://pym.jchun.me/${data.shortId}`;
        msg.channel.send(url)
        }
        catch (e) {
            console.log("shortening error")
            console.log(e)
        }
        
    }
    
}