  
const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

if (message.member.roles.cache.has('856573786563543093') || message.member.roles.cache.has('856574531773661215') || message.member.roles.cache.has('856574734728298516')){
    if (!args[0]) return message.reply('Please enter a valid Hex Code!')
   

    user.roles.highest.edit({
        color: args[0]
    })
    message.channel.send("Changed color.");

} else 
return message.reply('You do not have enough permission to use this command.')
}

module.exports.help = {
    name:"color",
    aliases: ["subc"]
  }