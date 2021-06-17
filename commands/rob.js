const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  

let user = message.mentions.members.first()
let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`)


let amount = Math.floor(Math.random() * 80) + 1;

let timeout = 600000;

let rob = await db.fetch(`rob_${message.guild.id}_${user.id}`);

if (rob !== null && timeout - (Date.now() - rob) > 0) {
  let time = ms(timeout - (Date.now() - rob));

  let timeEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`:no_entry_sign: You've already used this command, try again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
  return message.channel.send(timeEmbed)
} 
 else if (user.id == message.author.id) {

  return message.channel.send("You cannot rob yourself");

} else{


}
let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 ${user.user.username} does not have anything you can rob`);
if (targetuser <= 0) {
    return message.channel.send(moneyEmbed2)
}

let testChance =  Math.floor(Math.random() * 40) + 1;

console.log(testChance)
    // 5 here is percentage of success.
    if ((testChance -= 8) < 0) {
        // Success!
        let embed = new Discord.MessageEmbed()
        .setTitle('Like a Thief in the Night...')
        .setDescription(`💰 You robbed ${user} and got away with ${amount} coins!`)
        .setColor("RANDOM")
        message.channel.send(embed)

        db.subtract(`money_${message.guild.id}_${user.id}`, amount)
        db.add(`money_${message.guild.id}_${message.author.id}`, amount)
        db.set(`rob_${message.guild.id}_${user.id}`, Date.now())
      
    } else {
       
        message.channel.send(`**${message.author.username}**, Your robbery failed, how do you feel about that?`);

    }

  
};


module.exports.help = {
  name:"rob",
  aliases: [""]
}
