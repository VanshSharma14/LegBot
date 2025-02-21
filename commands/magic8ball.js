// A Magic 8-Ball command that responds with a random answer.
module.exports = {
    name: "magic8ball",
    usage: "magic8ball <question>",
    description: "Ask the Magic 8-Ball anything you like!",
    action: (msg, args) => {
        if (!args.length) {
            return msg.channel.send("People that use this command without a question get my magic 8 balls dragged across their face. U WANT THAT???");
        }

        const answers = [
            "oh hell naw you ain’t pulling that shit",
            "go for it fam—this fool’s already screwed six ways to sunday",
            "damn right yes—but if it flops don’t come whining",
            "no fucking way you absolute chaos goblin",
            "hit me up later i’m deep in some bullshit rn",
            "sure if you wanna dance with the devil’s sketchy ass",
            "idk man—your mom might have the tea on this",
            "i wouldn’t touch that crap with a stolen stick",
            "HELL YES a million times—but i’m staying tf outta this",
            "maybe—don’t go pinning that shit on me tho",
            "don’t you dare you glorious trainwreck",
            "future’s looking bleak as fuck—proceed with caution",
            "cosmos screaming FUCK YEAH—run with it",
            "all signs yelling hell no—but fuck it i’m here for the popcorn",
            "go ahead and tempt fate you wild bastard—not my circus"
        ];

        const randomIndex = Math.floor(Math.random() * answers.length);
        msg.channel.send(answers[randomIndex]);
    }
}
