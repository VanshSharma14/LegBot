const mongoose = require("mongoose")

const grabScheme = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("grabber", grabScheme)
// YES MONGO YES MONGO