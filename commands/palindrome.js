const { EmbedBuilder } = require("discord.js");
const Palindrome = require("../models/palindromeSchema.js");

module.exports = {
    name: "palindrome",
    description: "Get your or another user's palindrome count and level.",
    usage: "$palindrome [@user (optional)]",
    action: async (msg, args) => {
        // Determine target user (either mentioned user or self)
        const targetUser = msg.mentions.users.first() || msg.author;

        try {
            // Fetch the user's palindrome data
            const record = await Palindrome.findOne({ userId: targetUser.id });

            if (!record) {
                return msg.channel.send(`⚠️ No palindrome record found for **${targetUser.username}**.`);
            }

            // Build the embed response
            const embed = new EmbedBuilder()
                .setTitle(`🔍 Palindrome Stats for ${targetUser.username}`)
                .setColor("#ffcc00")
                .addFields([
                    { name: "🔢 Total Palindromes", value: `**${record.palindromeCount}**`, inline: true },
                    { name: "⭐ Level", value: `**${record.level}**`, inline: true }
                ])
                .setFooter({ text: "Keep those palindromes coming!" });

            msg.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error("Error fetching palindrome stats:", error);
            msg.channel.send("❌ An error occurred while fetching user stats. Try again later.");
        }
    },
};
