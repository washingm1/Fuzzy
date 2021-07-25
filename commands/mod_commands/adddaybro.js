const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
  

    var x = 0;

    if (db.get(message.author.id, 'Roles:')){
        return message.channel.send('You already initiated your inventory!')
      } else
            db.push(message.author.id, 'Roles:');
            message.channel.send('Inventory Initiated! You are now able to buy roles')
 


    

}

module.exports.help = {
    name:"start",
    aliases: ["start"]
  }