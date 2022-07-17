const OpenAI = require('openai-api')

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const openai = new OpenAI(OPENAI_API_KEY);
// let arr = [];
module.exports = {
    name: "legbot",
    usage: "legbot <your query>",
    description: "Piinto uses the OpenAI chatbot API to answer and querys the user may have.",
    
    action: async (msg, args) => {
        args = args.join(" ");
        // args = `${msg.author}: ${args}`
        // Piinto: motherfucker

        // save up to the last 8 messages
        // if (arr.length == 8) {
        //     arr.shift();
        //     arr.shift()
        // }
        // arr.push(args + "\n");
        // let message = arr.join("") + "LegBot: ";

        (async () => {
            const gptResponse = await openai.complete({
                engine: 'text-davinci-002',
                prompt: args,
                maxTokens: 450,
                temperature: 0.8,
                topP: .3,
                presencePenalty: 1,
                frequencyPenalty: 0.8,
                // bestOf: 1,
                // n: 1,
                // stream: false,
                // stop: ['\n', '\n\n']
            });
            let rep = gptResponse.data.choices[0].text;
            // rep = handleReply(rep);
            // arr.push(`LegBot: ${rep}\n`);
            

        // rep = "!piinto " + rep;
        if (rep.length > 2000){
            rep = rep.substring(0, 2000)
        }
        // console.log(arr)
        msg.reply(rep);
        })();
    }
}

function handleReply(reply) {
    let x = reply.replace(/^\n*[lL]eg[bB]ot:\s*|^\n+/, '');
    let y = x.replace(/^\n*[pP]iinto:\s*|^\n+/, '');
    return y;
  }
