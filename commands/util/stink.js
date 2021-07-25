const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
   

        let replies = ['', ]
        let result = Math.floor((Math.random() * replies.length));
   
        message.channel.send(`${replies[result]}`)

    };




module.exports.help = {
  name:"stink",
  aliases: [""]
}
