const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
   
  if(!message.content.startsWith('!'))return;  
//db.fetch(`guild_${message.guild.id}_level_${user.id}`)
  let ldbd = db.all().filter(data => data.ID.startsWith(`level`)).sort((a, b) => b.data - a.data)
  ldbd.length = 10;
  let finalLb2 = "";
  for (var i in ldbd) {
    finalLb2 += `**${ldbd.indexOf(i)+1}.**<@${ldbd[i].ID.slice(25)}> - level \`${ldbd[i].data}\`\n`;
  }
  
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
  .setColor("#ff0000")
  .addField(`Points Leaderboard`, console.log(finalLb2), false)
  message.channel.send(embed);

}
module.exports.help = {
  name:"leaderboard",
  aliases: ["leaderboard"]
}

