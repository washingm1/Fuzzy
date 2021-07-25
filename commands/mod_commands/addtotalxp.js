const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
  
    let user = message.mentions.members.first();

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('You do not have enough permission to use this command.')
    }

    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var xpNeeded = level * 850;
        var xp = db.get(`guild_${message.guild.id}_xp_${user.id}`)


  
    db.add(`xptotal_${message.guild.id}_${user.id}`, (level * xpNeeded + xp))
    




    message.channel.send('Successfully set total xp for ' + `${user.id} `+ 'to ' + `${(level * xpNeeded) + xp}`)
}

module.exports.help = {
    name:"addtotalxp",
    aliases: ["addtotalxp"]
  }