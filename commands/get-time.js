// This function is a command that gets the number of days since 4000 BC. It's a joke command, but it's a command nonetheless.
module.exports = {
    name: "get-time",
    usage: "get-time <@user-optional>",
    description: "get the # of days since 4000 BC",
    action: (msg, args) => {
        const date = new Date().toLocaleDateString();
        // mm/dd/yyyy
        args = args.join(" ")
        arg = args;
        let [month, day, year] = date.split("/").map(e => parseInt(e))
        let yearDays = Math.floor((year+4000)*365.25);
        let monthDays = month*30;
        let totalDays = day + yearDays + monthDays
        console.log(`before: ${totalDays}`)
        if (arg != "") {
            msg.reply(`Total number of days since 4000BC: ${totalDays}.\nAnd yet it's still less than the amount of days since ${arg} got any bitches.`);
            return;
        }
        msg.reply(`Total number of days since 4000BC: ${totalDays}.\nAnd yet it's still less than the amount of days since you got any bitches.`);
        console.log(`after: ${totalDays}`)
    }
}