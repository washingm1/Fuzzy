const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
   

        let replies = [
'https://media.giphy.com/media/26tOZ42Mg6pbTUPHW/giphy.gif','https://imgur.com/VWQYijF','http://gph.is/1MWJgze','https://i.pinimg.com/originals/45/14/00/451400f7046c8c51536e3249b973cd3f.gif','https://tenor.com/Sl0u.gif','https://thumbs.gfycat.com/ConstantPhonyAlligator-size_restricted.gif']
        let result = Math.floor((Math.random() * replies.length));
   
        message.channel.send(`${replies[result]}`)

    };




module.exports.help = {
  name:"sam",
  aliases: [""]
}
