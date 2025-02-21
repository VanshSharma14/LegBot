// const fetch = require('node-fetch');
// const GIPHY_API_KEY = "YOUR_GIPHY_API_KEY"; // Replace with your actual Giphy API key

// module.exports = {
//     name: "randomGifGen",
//     run: async (msg) => {
//         const keywords = ['obama', 'dance', 'weekend', 'cat'];
//         const content = msg.content.toLowerCase();
//         const matchingKeyword = keywords.find(keyword => content.includes(keyword));

//         if (matchingKeyword) {
//             try {
//                 console.log("sending request to Giphy API");
//                 const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${matchingKeyword}&rating=r`);
//                 const data = await response.json();
//                 if (data.data && data.data.embed_url) {
//                     msg.channel.send(data.data.embed_url);
//                 } else {
//                     console.error("No embed_url found in the response.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching GIF:", error);
//             }
//         }
//     }
// };
