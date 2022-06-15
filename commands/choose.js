const { pickRandom } = require("../util");

// Define a function that choses between two options
module.exports = {
    name: "choose",
    usage: "choose <option1> or <option2>",
    description: "choose between one or more options",
    action: (msg, args) => {
        args = args.join(" ")
        let content = args;
        // $choose nice try
        // "nice try"
        if (args.includes("choose")) {
            args = "nice try!"
        }
        if(args.length == 0) {
            msg.reply("At least put something there stupid!")
            return;
        }
        let options = content.split(" or ")
        msg.reply(pickRandom(options));
    }
}

// !choose ansh is gay or ansh is not gay
// !choose extra or sunglasses or shades
// !choose