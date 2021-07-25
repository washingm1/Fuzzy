const db = require('quick.db');
const Discord = require('discord.js');
  
module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
{
      /*   let items = await db.fetch(message.author.id);
        if(items === null) items = "Nothing" */
        let user = message.mentions.users.first() || message.author;
          items: []
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You can\'t use that!')

        db.fetch(`profile_${message.guild.id}_${user.id}`)
        db.fetch(`dailyBack_${message.guild.id}_${user.id}`)

        db.delete(`profile_${message.guild.id}_${user.id}`)
        db.delete(`dailyBack_${message.guild.id}_${user.id}`)
        message.channel.send(`${user}\'s profile background was successfully cleared!`)
    
      }
    
    
    }





  module.exports.help = {
    name:"clear profile",
    aliases: ["clearprofile"]
  }

