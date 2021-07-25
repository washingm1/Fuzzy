const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');

const { colorRoles } = require("./role_id");

console.log(colorRoles)

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
    let items = await db.fetch(message.author.id, { items: []});
    let user = message.guild.members.cache.get(message.author.id)
   
   
    for (const x of colorRoles) {
if (args[0] == `${x.id}`) {

console.log(x.id)

if (!items.includes(`${message.guild.roles.cache.get(`${x.roleid}`)}`)){
        let rejectEmbed = new Discord.MessageEmbed()
        .setDescription('You do not own this role!');
        return message.channel.send(rejectEmbed);       
      }
      else
       if (message.member.roles.cache.some(role => role.name === x.role)) {
          let embed = new Discord.MessageEmbed().setDescription('You already have this role!');
          return message.channel.send(embed);
         }

 user.roles.remove(user.roles.highest); 

    await message.guild.members.cache.get(user.id).roles.add(x.roleid);
    let embed = new Discord.MessageEmbed().setDescription(`You now have the ${message.guild.roles.cache.get(x.roleid)} role!`);
    message.channel.send(embed);



}


}
}

module.exports.help = {
    name: "equip",
    description: "Equip Role",
    aliases: ["equip"]
}
