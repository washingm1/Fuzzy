const db = require('quick.db');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (bot, message) => {
    if(!message.content.startsWith('!'))return; 

    let user = message.guild.members.cache.get(message.author.id)
 
    const channel = user.guild.channels.cache.find(ch => ch.name === 'test');

    let scav = new MessageButton()
    .setStyle('blurple')
    .setLabel('Scavenger Hunt Role')
    .setID('scav')
   
    let args = message.content.replace('!sendbtn', '').split('.'); // Add an extra space after the comma if necessary

    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(args[0])
    .setDescription(args[1])
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setAuthor(`ADoorMatt`)
    .setFooter('Just for participating, get the June Scavenger Hunt role! ⏬')


  let buttons = new MessageActionRow()
    .addComponent(scav)
   
   
channel.send({embed: embed, component: buttons})

    bot.on('clickButton', async (button) => {

        if (button.id == 'scav'){
                button.defer()
                   await message.guild.members.cache.get(user.id).roles.add('858438114275491873');
                    };


    });










}

module.exports.help = {
    name: "sendbtn",
    description: "send a button w message",
    aliases: ["sbtn"]
}