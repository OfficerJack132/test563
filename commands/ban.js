const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if (!bUser) message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry you don't have this permission.");
        if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be banned. Sorry.")

        let banEmbed = new Discord.RichEmbed()
            .setDescription("~Ban~")
            .setColor("#e8770d")
            .addField("Banned User", `${bUser} with ID ${bUser.is}`)
            .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Banned In", message.channel)
            .addField("Time", message.createdAt)
            .addField("Reason", bReason);

        let banChannel = message.guild.channels.find(`name`, "bans");
        let banChannel2 = message.guild.channels.find(`name`, "bot-logs");
        if (!banChannel) return message.channel.send("Can't find ban channel. If you have one ask owner to check script or make sure to name it right");

        message.delete().catch(O_o=>{});
        message.guild.member(bUser).ban(bReason);
        banChannel.send(banEmbed);
        banChannel2.send(banEmbed);

        return;
    }

module.exports.help = {
    name: "ban"
}