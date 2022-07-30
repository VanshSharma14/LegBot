const {
  ApplicationCommandOptionChannelTypesMixin,
} = require("@discordjs/builders");
const grabber = require("../models/grabber.js");

module.exports = {
  name: "grab",
  usage: "grab <@user-optional>",
  description: "choose between one or more options",
  action: async (msg, args) => {
    let arglen = args.length;
    let contents = args[1];
    let type = args[0];

    if (arglen != 2) {
      msg.reply("Usage: --grab <user/search> <@user/text>");
      return;
    }
    await msg.channel.messages.fetch({ limit: 20 }).then((messages) => {
      if (messages.size == 20) {
        const arr = Array.from(messages.values());
        for (let i = 1; i < arr.length; i++) {
          // make sure it doesn't save a command
          if (arr[i].content.includes("--")) {
            continue;
          }
          // msg.reply(`<@${msg.author.id}>`)
          let text = args[1].toLowerCase;
          console.log(arr[i].contents);
          const lowQuote = arr[i].contents;
          username = `<@${arr[i].author.id}>`;
          console.log("Type: " + arr[i].content);
          console.log("username: " + username + " " + contents);
          if (
            (type == "user" && username == contents) ||
            (type == "search" && arr[i].content.includes(args[1]))
          ) {
            console.log("before");
            console.log(`arr[i] ${arr[i].content}`);
            try {
              const dbMessage = grabber.create({
                user: username,
                quote: arr[i].content,
              });
            } catch (e) {
              console.log(e);
            }
            console.log("message saved");
            // find saved message
            grabber.find({ user: username }, "quote", function (err, quotes) {
              if (err) return handleError(err);
            });

            msg.channel.send(`Added quote "${arr[i]}"`);
            return;
          }
        }
      }
    });
  },
};

// obj => gm {
//     userID: "<@23423490823490>"
//     username: "mfk#3394"
//     nickname: "holyNinos[maybeNums]"
//     message: "i love cock"
// }
