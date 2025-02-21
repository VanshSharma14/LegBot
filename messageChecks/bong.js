module.exports = {
    name: "bongCheck",
    run: (msg) => {
      if (msg.content.toLowerCase().includes("bing")) {
        msg.channel.send("bong");
      }
    }
  };