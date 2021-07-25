const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('You do not have enough permission to use this command.')
    }

    if (!args[0]) return message.reply('Please specify an amount to add.')
    if (isNaN(args[0])) return message.reply('That was not a valid number!')


    message.channel.send('Successfully added ' + args[0] + ' level(s) to ' + `${message.mentions.members.first()}`)
    db.add(`guild_${message.guild.id}_level_${user.id}`, args[0])

}

module.exports.help = {
    name:"addlevel",
    aliases: ["addlevel"]
  }