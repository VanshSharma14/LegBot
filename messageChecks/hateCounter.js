const fs = require("fs");
const { USER_IDS } = require("../constants/users");

const filePath = "./data/hateCounter.json"; // Path to JSON file

// Load hate counter
let hateCounter = { COUNT: 0 };

if (fs.existsSync(filePath)) {
    try {
        hateCounter = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
        console.error("Error reading hateCounter.json:", err);
        hateCounter = { COUNT: 0 }; // Reset if JSON is corrupted
    }
} else {
    // Create file if missing
    fs.writeFileSync(filePath, JSON.stringify(hateCounter, null, 2));
}

module.exports = {
    name: "hateCounter",
    run: (msg) => {
        if (msg.author.id === USER_IDS.ANSH) {
            // Ensure "hate" is a standalone word (not part of another word)
            const words = msg.content.toLowerCase().split(/\s+/);
            if (words.includes("hate")) {
                hateCounter.COUNT++;
                // Save updated count to file
                fs.writeFileSync(filePath, JSON.stringify(hateCounter, null, 2));
                msg.channel.send(`Angy's hate counter: ${hateCounter.COUNT}`);
            }
        }
    }
};
