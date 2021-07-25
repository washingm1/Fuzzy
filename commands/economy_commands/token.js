const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
    let user = message.mentions.members.first() || message.author;
  let tokens = db.fetch(`token_${message.guild.id}_${message.author.id}`)
  let testChance =  Math.floor(Math.random() * 100) + 1;

  console.log(tokens)
  if (tokens < 1){
   return message.channel.send('You do not have any tokens!');
            }

      console.log(testChance)

          // 5 here is percentage of success.
          if (testChance < 25) {
              console.log(testChance)
              let embed = new Discord.MessageEmbed()
              .setTitle('Token Used')
              .setDescription(`You used a token and got a **rob token!** ${tokens -1} token(s) remaining `)
              .setColor("RANDOM")
              message.channel.send(embed)

           
           db.add(`robToken_${message.guild.id}_${message.author.id}`, 1)
                 
          } if (testChance > 25 && testChance < 40){
        
            let embed = new Discord.MessageEmbed()
            .setTitle('Token Used')
            .setDescription(`You used a token and got **1000 coins!** ${tokens -1} token(s) remaining `)
            .setColor("RANDOM")
            message.channel.send(embed)
    
          
            db.add(`money_${message.guild.id}_${user.id}`, 1000)
               
        } if (testChance > 40 && testChance < 70){
        
            let embed = new Discord.MessageEmbed()
            .setTitle('Token Used')
            .setDescription(`You used a token and got **500 coins!** ${tokens -1} token(s) remaining `)
            .setColor("RANDOM")
            message.channel.send(embed)
            db.add(`money_${message.guild.id}_${user.id}`, 500)

        }if (testChance > 70 && testChance < 100){
        
            let embed = new Discord.MessageEmbed()
            .setTitle('Token Used')
            .setDescription(`You used a token and won **nothing**! ${tokens -1} token(s) remaining `)
            .setColor("RANDOM")
            message.channel.send(embed)
     
        }





        db.subtract(`token_${message.guild.id}_${message.author.id}`, 1)
}

module.exports.help = {
  name:"token",
  aliases: [""]
}