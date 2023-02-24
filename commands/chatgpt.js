
import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt';
// Define a function that choses between two options
module.exports = {
    name: "chatgpt",
    usage: "chatgpt <prompt>",
    description: "ask and you shall recieve",
    action: async (msg, args) => {
        console.log("function called")
        args = args.join(" ")
        const openAIAuth = await getOpenAIAuth({
            email: process.env.EMAIL,
            password: process.env.EMAIL
        });
        const api = new ChatGPTAPI({ ...openAIAuth })
        await api.ensureAuth();
        console.log("past auth");
        const response = await api.sendMessage(args);
        console.log("waiting on response");
        console.log(response)
    }
} 