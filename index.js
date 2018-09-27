const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
let xp = require("./xp.json");
let purple = botconfig.purple;

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("Your every move. ;)", { type: "Watching" });
});

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server.`);

    let.welcomechannel = member.guild.channels.find(`name`, "welcome-leave");
    welcomechannel.send(`${member} has joined this server. Is that good or bad?`);
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} left the server.`);

    let.welcomechannel = member.guild.channels.find(`name`, "welcome-leave");
    welcomechannel.send(`${member} has left this cool server. Jokes on him, we still lit.`);
});

bot.on("channelCreate", async channel => {
    

    console.log(`${channel.name} has been created.`);

    let sChannel = channel.guild.channels.find(`name`, "bot-logs");
    sChannel.send(`${channel} has been created`);
})


bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }

    let xpAdd= Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);

    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp:0,
            level: 1
        };
    }


    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 500;
    xp[message.author.id].xp =  curxp + xpAdd;
     if(nxtLvl <= xp[message.author.id].xp){
         xp[message.author.id].level = curlvl + 1;
         let lvlup = new Discord.RichEmbed()
         .setTitle("Level Up!")
         .setColor(purple)
         .addField("New Level", curlvl + 1);

         message.channel.send(lvlup).then(msg => {msg.delete(10000)});
    }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
    });

    console.log(`level is ${xp[message.author.id].level}`);

    let prefix = prefixes[message.guild.id].prefixes;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args); 

    if (cmd === `hello`) {
        return message.channel.send("Hello!")
    }
});
bot.login(botconfig.token);
