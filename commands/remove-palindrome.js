const Palindrome = require("../models/palindromeSchema.js");

const ADMIN_ID = "262309747095633930"; // Replace this with your actual Discord ID

module.exports = {
    name: "remove-palindrome",
    usage: "remove-palindrome @user",
    description: "Admin-only command to delete a user's palindrome record.",
    action: async (msg, args) => {
        // Ensure only the admin can use this
        console.log(msg.author.id);
        if (msg.author.id !== ADMIN_ID) {
            return msg.channel.send("❌ You do not have permission to use this command.");
        }

        // Ensure a user is mentioned
        const targetUser = msg.mentions.users.first();
        if (!targetUser) {
            return msg.channel.send("❌ You need to mention a user to remove their palindrome record.");
        }

        try {
            // Remove the user's palindrome record
            const deletion = await Palindrome.findOneAndDelete({ user: targetUser.id });
            if (!deletion) {
                return msg.channel.send(`⚠️ No palindrome record found for ${targetUser.username}.`);
            }

            msg.channel.send(`🚮 Palindrome record for ${targetUser.username} has been deleted.`);
        } catch (error) {
            console.error("Error removing palindrome record:", error);
            msg.channel.send("❌ An error occurred while trying to remove the record.");
        }
    }
};
