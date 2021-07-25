const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {

    
    const channel2 = bot.channels.cache.find(channel => channel.id === "732757852615344139");
    const { content } = message
    const eachLine = content.split('\n')

    for (const line of eachLine){
        if (line.includes('=')){
            const split = line.split('=')
            const emoji = split[0].trim()
            message.react(emoji)
        }
    }
    


      

}

module.exports.help = {
  name:"poll",
  aliases: [""]
}