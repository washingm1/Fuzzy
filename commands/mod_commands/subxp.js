const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
  
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('You do not have enough permission to use this command.')
    }

    if (!args[0]) return message.reply('Please specify an amount to subtract.')
    if (isNaN(args[0])) return message.reply('That was not a valid number!')


    message.channel.send('Successfully subtracted ' + args[0] + ' from ' + `${message.mentions.members.first()}`)
    db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, args[0])
}

module.exports.help = {
    name:"subtractxp",
    aliases: ["subxp"]
  }