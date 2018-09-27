const Discord = require("discord.js");

module.exports.run = async (btoa, message, args) => {

        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if (!kUser) message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Sorry you don't have this permission.");
        if (kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked. Sorry.")

        let kickEmbed = new Discord.RichEmbed()
            .setDescription("~Kick~")
            .setColor("#e8770d")
            .addField("Kicked User", `${kUser} with ID ${kUser.is}`)
            .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
            .addField("Kicked In", message.createdAt)
            .addField("Time", message.createdAt)
            .addField("Reason", kReason);

        let kickChannel = message.guild.channels.find(`name`, "kicks");
        let kickChannel2 = message.guild.channels.find(`name`, "bot-logs");
        if (!kickChannel) return message.channel.send("Can't find kick channel. If you have one ask owner to check script or make sure to name it right");
       
        message.delete().catch(O_o=>{});
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
        kickChannel2.send(kickEmbed);

        return;
    }


module.exports.help = {
    name: "kick"
}