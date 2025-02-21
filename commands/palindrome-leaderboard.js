const { EmbedBuilder } = require("discord.js");
const Palindrome = require("../models/palindromeSchema.js");

module.exports = {
    name: "palindrome-leaderboard",
    description: "Displays the top users with the most palindromes.",
    usage: "$palindrome-leaderboard [optional: top N users]",
    action: async (msg, args) => {
        // Parse the optional number argument
        let topN = args.length > 0 ? parseInt(args[0]) : 5;

        // Ensure it's a valid number within range
        if (isNaN(topN) || topN < 1) {
            return msg.channel.send("❌ Invalid number. Please enter a **positive integer**.");
        }
        if (topN > 10) {
            topN = 10; // Limit to max 10 users
        }

        try {
            // Fetch top N users sorted by palindrome count (descending)
            const leaderboard = await Palindrome.find()
                .sort({ palindromeCount: -1 })
                .limit(topN);

            if (leaderboard.length === 0) {
                return msg.channel.send("⚠️ No palindrome records found!");
            }

            // Build embed
            const embed = new EmbedBuilder()
                .setTitle("🏆 Palindrome Hall of Fame 🏆")
                .setDescription(`Top **${topN}** results`)
                .setColor("#0099ff")
                .setFooter({ text: "Everyone else sucks!" });

            // Add fields for each leaderboard entry
            leaderboard.forEach((user, index) => {
                embed.addFields([
                    { 
                        name: `**${index + 1}. ${user.username}**`, 
                        value: `Palindromes: **${user.palindromeCount}** (Level ${user.level})`, 
                        inline: false 
                    }
                ]);
            });

            msg.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error("Error fetching palindrome leaderboard:", error);
            msg.channel.send("❌ An error occurred while fetching the leaderboard. Try again later.");
        }
    },
};
