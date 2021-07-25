const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('You do not have enough permission to use this command.')
    }

    if (!args[0]) return message.reply('Please specify an amount to add.')
    if (isNaN(args[0])) return message.reply('That was not a valid number!')


    message.channel.send('Successfully added ' + args[0] + ' XP to ' + `${user}`)
    db.add(`guild_${message.guild.id}_xp_${message.author.id}`, args[0])
}

module.exports.help = {
    name:"addxp",
    aliases: ["addxp"]
  }