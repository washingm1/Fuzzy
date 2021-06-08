const Discord = require('discord.js')
const db = require('quick.db')
const Canvacord = require('canvacord');
const { PNGStream } = require('canvas');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  
{
    xp(message)
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
   var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
   var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
   var xpNeeded = level * 500 + 500 
   const rankcard = new Canvacord.Rank()
 
   .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
   .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
   .setRequiredXP(xpNeeded)
   .setStatus(user.presence.status)
  .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
  .setRank(1, 'RANK', false)
  .setProgressBar("#33A5FF", "COLOR")
  .setOverlay("#000000")
  .setUsername(user.username)
  .setDiscriminator(user.discriminator)
  .setBackground("IMAGE", "https://media.discordapp.net/attachments/492703825287839754/848348848408625192/rankc.png")
  rankcard.build()
  .then(data => {
    const attach = new Discord.MessageAttachment(data, "rankcard.png")
    message.channel.send(attach)
  })

  }
     function xp(message){
       if(message.author.bot) return
       const randomNumber = Math.floor(Math.random() * 10) + 15;
       const randomNumber2 = Math.floor(Math.random() * 5);
       db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
       db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)

       db.add(`money_${message.guild.id}_${message.author.id}`, randomNumber2)

       var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
       var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
       var xpNeeded = level * 500;
       if(xpNeeded < xp){
         var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
         db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
         message.channel.send(`${message.author}, you are now level ${newLevel}!`)
       }
     } 

     
    }

    
module.exports.help = {
  name:"rank",
  aliases: [""]
}