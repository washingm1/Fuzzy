const { Slash } = require('discord-slash-commands');
const Discord = require('discord.js')
const db = require('quick.db')
const client = new Discord.Client();
require('discord-slider')(client);
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (bot, message, args) => {
 
    if(!message.content.startsWith('!'))return;  
/*   message.channel.send(`${message.author}, sent you a DM!`)
    message.author.send('Looks like you needed some help, here you go!'); */

    let embed = new Discord.MessageEmbed()
    .setTitle("Fuzzybrain Bot Help [Prefix !]")
    .addField("Economy Commands", "**Work:** Get a random amount of credits for working! Cooldown every 30 minutes \n **rob:** Steal a random amount of credits from another user! \n **pay:** Give another user a specified amount of credits! \n\n **start:** Enable your inventory, this allows you to buy roles from the shop! \n\n**balance:** Check the amount of credits and tokens you have \n\n **top:** view the users with the most points in the server \n\n **profile:** view your personal stats \n\n **withdraw:** Take out a specified amount of credits from the bank \n\n **deposit:** Deposit a specified amount of credits in the bank \n\n **daily:** Collect credits on a daily basis! \n\n **buy:** Buy a role from the shop \n\n")
    .setColor("RANDOM")

    let embed2 = new Discord.MessageEmbed()
    .setTitle("Fuzzybrain Bot Help [Prefix !]")
    .addField("Info Commands", "**Invites:** Check how many people you've invited to the server! \n\n **pronoun:** Add or remove any pronoun roles!\n\n **Remind** Set a specified amount of time to remind you of something! \n\n **Userinfo:** Check your discord information! \n\n ")
    .setColor("RANDOM")



message.channel.createSlider(message.author.id, [embed, embed2], "➡", "⬅")

}

module.exports.help = {
  name:"help",
  aliases: [""]
}