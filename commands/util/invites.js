const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { guildIcon } = require("canvacord/src/Canvacord");

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
let user = message.mentions.users.first() || message.author
let invites = await message.guild.fetchInvites();
let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id)

if(userInv.size <= 0){
    return message.channel.send(`${user.username} doesnt have any invites`)

}

let invCodes = userInv.map(x => x.code).join('\n')

let i = 0;

userInv.forEach(inv => i+= inv.uses)

const embed = new Discord.MessageEmbed()
.setTitle(`${user.username}'s Invites`)
.addField('User Invites', i)
.addField('Invite Codes', invCodes)
.setColor('RANDOM')
.setTimestamp()
message.channel.send(embed)

if (i > 5){
    message.guild.members.cache.get(user.id).roles.add('855187421126066187');
  }
  if (message.member.roles.cache.some(role => role.name === 'promoter')) {
        return;
   } else 
   message.channel.send(`You now have the ${message.guild.roles.cache.get('855187421126066187')} role!`)

}



module.exports.help = {
    name:"invites",
    aliases: ["inv"]
  }
  
  
  