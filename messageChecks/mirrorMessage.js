// mirrorMessage.js (in messageChecks folder)
// Checks if a message is a palindrome (ignoring spaces and case) that is at least 5 characters long
// and contains at least 3 unique letters. If so, sends a spooky response, updates the leaderboard,
// and prevents counting the same palindrome twice.
const Palindrome = require("../models/palindromeSchema.js");

const LEVEL_UP_THRESHOLD = 10;

module.exports = {
    name: "mirrorMessage",
    run: async (msg) => {
        // Remove spaces and normalize case
        let stripped = msg.content.replace(/\s+/g, "").toLowerCase();
        if (stripped.length < 5) return; // Minimum length requirement

        // Ensure the message has at least 3 unique letters
        const uniqueLetters = new Set(stripped.split(""));
        if (uniqueLetters.size < 3) return;

        // Check if it's a palindrome
        if (stripped !== stripped.split("").reverse().join("")) return;

        // Prepare identifiers (using "DM" as guild if not in a guild)
        const userId = msg.author.id;
        const username = msg.author.username;
        const guildId = msg.guild ? msg.guild.id : "DM";

        let leveledUp = false;
        let newCount, newLevel;

        try {
            let record = await Palindrome.findOne({ userId, guild: guildId });

            if (!record) {
                // Create a new record if one doesn't exist, initializing with this palindrome.
                record = new Palindrome({
                    userId,
                    username, // Store the username
                    palindromeCount: 1,
                    guild: guildId,
                    palindromes: [stripped] // Storing the normalized palindrome
                });
            } else {
                // Ensure username is always up to date in case they changed it
                record.username = username;

                // Ensure the palindromes array exists.
                if (!Array.isArray(record.palindromes)) {
                    record.palindromes = [];
                }

                // Prevent counting duplicate palindromes.
                if (record.palindromes.includes(stripped)) {
                    msg.channel.send(`Duplicate detected! You've already rocked that palindrome. Your count remains at **${record.palindromeCount}**.`);
                    return;
                }

                // Add this new palindrome and update count.
                record.palindromes.push(stripped);
                record.palindromeCount += 1;

                if (record.palindromeCount % LEVEL_UP_THRESHOLD === 0) {
                    record.level += 1;
                    leveledUp = true;
                }
            }

            newCount = record.palindromeCount;
            newLevel = record.level;
            await record.save();
        } catch (error) {
            console.error("Error updating palindrome leaderboard:", error);
            return;
        }

        // Define cool responses with bolded numbers.
        const normalResponses = [
            `Whoa, that's a palindrome! Nice moves :smirk: [lifetime: **${newCount}**]`,
            `Okayyy, palindrome count **${newCount}** in the books. Keep 'em coming :eyes:`,
            `Palindrome power activated! You've now got **${newCount}** in your arsenal.`,
            `Your palindromes are on fire! **${newCount}** and counting :fire:`
        ];

        const levelUpResponses = [
            `Okayyy palindrome level **${newLevel}**, I see you :eyes:`,
            `Level up! You're now rocking level **${newLevel}** with **${newCount}** palindromes :star_struck:`,
            `Boom! You've hit level **${newLevel}**! Keep those palindromes coming :sunglasses:`,
            `Your palindrome game is next level! Level **${newLevel}** unlocked with **${newCount}** records :trophy:`
        ];

        // Pick a random response based on whether a level-up occurred.
        const responses = leveledUp ? levelUpResponses : normalResponses;
        const randomIndex = Math.floor(Math.random() * responses.length);
        const chosenResponse = responses[randomIndex];

        msg.channel.send(chosenResponse);
    }
};
