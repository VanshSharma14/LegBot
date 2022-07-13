const OpenAI = require('openai-api')

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI(OPENAI_API_KEY);

module.exports = {
    name: "legbot",
    usage: "legbot <your query>",
    description: "Piinto uses the OpenAI chatbot API to answer and querys the user may have.",
    action: async (msg, args) => {
        args = args.join(" ");
        (async () => {
            const gptResponse = await openai.complete({
                engine: 'text-davinci-002',
                prompt: args,
                maxTokens: 100,
                temperature: 0.8,
                topP: .3,
                presencePenalty: 0,
                frequencyPenalty: 0.5,
                // bestOf: 1,
                // n: 1,
                // stream: false,
                // stop: ['\n', '\n\n']
        });
        let rep = gptResponse.data.choices[0].text;
        rep = "!piinto " + rep;
        if (rep.length > 2000){
            rep = rep.substring(0, 2000)
        }
        msg.reply(rep);
        })();
    }
}
