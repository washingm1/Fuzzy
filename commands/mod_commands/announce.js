const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  

    const channel2 = bot.channels.cache.find(channel => channel.id === "659404619847303169");

    const thumbEmoji = '👍'

  
    

    channel2.send(`${message.content.replace('!announce', '')}`);
        

        message.react("👍")


      

}

module.exports.help = {
  name:"announce",
  aliases: ["ann"]
}