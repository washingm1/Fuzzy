const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  

let user = message.mentions.members.first()
let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`)


let amount =  Math.floor(Math.random() * 200) + 15;



let rob = await db.fetch(`robToken_${message.guild.id}_${message.author.id}`)

console.log(rob + ' rob token')

if (user.id == message.author.id) {

  return message.channel.send("You cannot rob yourself");

} else

if (rob < 1) {
 let timeEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have any rob tokens!`);
  return message.channel.send(timeEmbed)
} 
 



let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 ${user.user.username} does not have anything you can rob`);
if (targetuser <= 0) {
    return message.channel.send(moneyEmbed2)
}

let testChance =  Math.floor(Math.random() * 200) + 1;

console.log(testChance)
    // 5 here is percentage of success.
    if ((testChance -= 40) < 0) {
        // Success!
        let embed = new Discord.MessageEmbed()
        .setTitle('Like a Thief in the Night...')
        .setDescription(`💰 You robbed ${user} and got away with ${amount} coins!`)
        .setColor("RANDOM")
        message.channel.send(embed)
         db.subtract(`robToken_${message.guild.id}_${message.author.id}`, 1)

        db.subtract(`money_${message.guild.id}_${user.id}`, amount)

        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
       
      
    } else {
       
        message.channel.send(`**${message.author.username}**, Your robbery failed, how do you feel about that?`);
        db.subtract(`robToken_${message.guild.id}_${message.author.id}`, 1)
        
    }

  
};


module.exports.help = {
  name:"rob",
  aliases: [""]
}