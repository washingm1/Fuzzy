const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  

    const channel2 = bot.channels.cache.find(channel => channel.id === "848236401502060614");

    

    
        
    channel2.send(`${message.content.replace('!botlog', '')}`);
        

        message.react("👍")


      

}

module.exports.help = {
  name:"botlog",
  aliases: [""]
}