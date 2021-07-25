const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  

    const channel2 = bot.channels.cache.find(channel => channel.id === "732757852615344139");


    if (message.content.includes("https://open.spotify.com/" || "https://music.apple.com/" || "https://www.youtube.com/" || "https://soundcloud.com")) {
        
    channel2.send(`${message.author} shared a song: \n  ${message.content.replace('!share', '')}`);
        

    } else message.channel.send("Not a valid link!");

      

}

module.exports.help = {
  name:"share",
  aliases: [""]
}