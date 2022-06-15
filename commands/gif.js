

module.exports = {
    name: "gif",
    usage: "gif <search>",
    description: "get a random gif using the search query",
    action: (msg, args) => {
        let content = args;

        //javascript, jQuery
        var xhr = $.post("http://upload.giphy.com/v1/gifs", {api_key: "uHSHfcLYoTueYlXpdoDJc7SYgpCyklV7", username: "goldenpotato14", source_image_url: "http://www.mysite.com/myfile.mp4"});
        xhr.done(function(data) { console.log("success got data", data); });
    }
}