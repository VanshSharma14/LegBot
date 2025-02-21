const mongoose = require("mongoose");

const palindromeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    palindromeCount: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    guild: {
        type: String,
        required: false
    },
    palindromes: {
        type: [String], // Array of past palindromes used
        default: []
    }
});

// Export the model
module.exports = mongoose.model("Palindrome", palindromeSchema);
