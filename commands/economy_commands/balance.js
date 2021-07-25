const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args, utils) => {
  if(!message.content.startsWith('!'))return;  

  let user = message.mentions.members.first() || message.author;
  

  let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

  let tokens = db.fetch(`token_${message.guild.id}_${message.author.id}`)
  if (tokens === null) tokens = 0;

  
let rob = await db.fetch(`robToken_${message.guild.id}_${message.author.id}`)
if (rob === null) rob = 0;

   
  let moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`${user.username}'s Balance`)
  .setDescription(`**Pocket**\n${bal} credits\n**Bank**\n${bank} credits\n**Tokens**\n${tokens} tokens\n**Rob Tokens**\n${rob} tokens`)
 

  message.channel.send(moneyEmbed)


};

module.exports.help = {
  name:"balance",
  aliases: ["bal"]
}