const Discord = require("discord.js");

module.exports.run = async (btoa, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No no no.")
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say"
}