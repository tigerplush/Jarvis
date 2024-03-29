const package = require('../package.json');
module.exports =
{
    name: "info",
    usage: "",
    description: "Gives basic info about " + package.name,
    example:
        [
            ["", "returns basic information about " + package.name]
        ],
    execute(message, args)
    {
        let infoString = "";
        infoString += package.name + " v" + package.version + "\n";
        infoString += package.description + "\n";
        infoString += "by " + package.author + "\n";
        infoString += "If you want to contribute, report bugs or suggest features and enhancements, please go to " + package.homepage;
        message.channel.send(infoString);
    },
};
