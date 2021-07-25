const db = require('quick.db');
const Discord = require('discord.js');
  
module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
{
        let items = await db.fetch(message.author.id);
        if(items === null) items = "Nothing"
        let target = message.mentions.users.first() || message.author;
          items: []
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You can\'t use that!')
    
        db.fetch(`${target.id.items}`, []);
        db.delete(target.id, items)
        message.channel.send(`${target}\'s inventory was successfully cleared!`)
    
      }
    
    
    }





  module.exports.help = {
    name:"clear inventory",
    aliases: ["clearinvent"]
  }

