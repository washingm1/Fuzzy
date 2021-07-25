const Discord = require('discord.js');
const db = require("quick.db");
const Canvas = require('canvas');
const client = new Discord.Client();
require('discord-slider')(client);
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (bot, message) => {
    if(!message.content.startsWith('!'))return;  

    let user = (message.mentions.users.first()) || message.author;
    let member = message.mentions.members.first() || message.member;

    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let tokens = db.fetch(`token_${message.guild.id}_${message.author.id}`)

const memberRoles = member.roles.cache
.filter((roles) => roles.id !== message.guild.id)
.map((role) => role.toString());

    const embed0 = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}'s Info`)
    .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
    .addField('Username',user.username + '#' + user.discriminator)
    .addField('ID', message.author.id)
    .addField('Join Date', message.member.joinedAt)
    .addField('Account Created At', message.author.createdAt)
    .addField('Highest Role',`${member.roles.highest}`)
    .setColor('RANDOM')

    console.log(member.displayHexColor)
  

    const embed1 = new Discord.MessageEmbed()
    .setTitle(`${message.author.username}'s Info`)
    .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
    .addField('Level', `${level}` ) // user, roles)
    .addField('Balance', `${money} Credits`)
    .addField('Tokens:', tokens)
    .addField('All Roles', `${memberRoles}`)

    .setColor('RANDOM')

 
    //return message.channel.send(embed)

    message.channel.createSlider(message.author.id, [embed0, embed1], "➡", "⬅")
}




module.exports.help = {
    name:"userinfo",
    aliases: ["info"]
  }
