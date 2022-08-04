const { ContextMenuInteraction } = require("discord.js");
const grabber = require("../models/grabber.js");

// list all saved quotes by user
module.exports = {
  name: "list",
  usage: "list <@user>",
  description: "list all grabbed commands by a user",
  action: async (msg, args) => {
    if (args.length == 1) {
      let username = args[0];
      console.log(`found username: ${username}`);
      grabber.find({ user: username }, "quote", function (err, quotes) {
        if (err) return handleError(err);
        else {
          let quotesArr = [];
          for (let i = 0; i < quotes.length; i++) {
            console.log(quotes[i].quote);
            quotesArr.push(quotes[i].quote);
          }
          console.log("Adding quote");
          if (quotesArr.length == 0) {
            msg.reply("No data from user");
            return;
          }
          let finalMessage = quotesArr.join("\n");
          msg.channel.send(finalMessage);
        }
      });
      return;
    } else {
      msg.reply("usage: --list <@user>");
      return;
    }
  },
};
