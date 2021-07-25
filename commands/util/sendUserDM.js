const db = require('quick.db');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (bot, message) => {
    if(!message.content.startsWith('!'))return; 




   
    let args = message.content.replace('!senddm', '').split('.'); // Add an extra space after the comma if necessary


    const user = await bot.users.fetch(`${args[0]}`).catch(() => null);
 
    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`${user.username}, ${args[1]}`)
    .setDescription(args[2])
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setAuthor(`From Dayglow Discord To You`)
    .setTimestamp()


   console.log(args[0])
   
user.send(embed)


}

module.exports.help = {
    name: "senddm",
    description: "Send a dm to user(s)",
    aliases: ["sdm"]
}