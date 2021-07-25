const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
   
  if(!message.content.startsWith('!'))return;  

  let level = db.all().filter(data => data.ID.startsWith(`guild_646074330249429012_level`)).sort((a, b) => b.data - a.data)
  level.length = 10;
  let finalLb2 = "";
  for (var i in level) {
    finalLb2 += `**${level.indexOf(level[i])+1}.**<@${level[i].ID.replace('guild_646074330249429012_level_', '')}> - Level \`${level[i].data}\`\n`;
  }
  
  console.log(finalLb)
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
  .setColor("#ff0000")
  .addField(`Points Leaderboard`, finalLb, false)
  message.channel.send(embed);

}
module.exports.help = {
  name:"top2",
  aliases: ["tp2"]
}