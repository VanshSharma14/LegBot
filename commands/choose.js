const { pickRandom } = require("../util");

// Define a function that choses between two options
module.exports = {
    name: "choose",
    usage: "choose <option1> or <option2>",
    description: "choose between one or more options",
    action: (msg, args) => {
        let content = args.join(" ")
        if(args.length == 0) {
            msg.reply("At least put something there stupid!")
            return;
        }
        let options = content.split(" or ")
        msg.reply(pickRandom(options));
    }
}

