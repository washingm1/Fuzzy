const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');

const { concerts } = require("../arrays/concert_cities");


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
let user = message.guild.members.cache.get(message.author.id)

    
for(const x of concerts){
if (args[0] == `${x.cmdName}`) {

    if (message.member.roles.cache.some(role => role.name === x.roleName)) {
        let embed = new Discord.MessageEmbed().setDescription(`Removing the ${x.roleName} role`);
        return message.channel.send(embed);
       }
       let embed2 = new Discord.MessageEmbed().setColor('RANDOM').setDescription(`You now have the ${x.roleName} concert role!`);
    message.channel.send(embed2);
    await message.guild.members.cache.get(user.id).roles.add(x.id);
        }
    }
}


module.exports.help = {
    name: "concert",
    description: "Equip Concert Role",
    aliases: [""]
}
