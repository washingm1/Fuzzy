const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
  


let home = new MessageButton()
.setStyle("url")
.setURL('https://www.last.fm/home')
.setLabel('Take Me There')

let learnmore = new MessageButton()
.setStyle('url')
.setURL('https://www.last.fm/about')
.setLabel('Learn More')

let buttons = new MessageActionRow()
.addComponent(learnmore)
.addComponent(home)

let embed = new Discord.MessageEmbed()
.setThumbnail('https://media.discordapp.net/attachments/733319258351730693/850030028078186586/196_Lastfm_Square_logo_logos-512.png?width=465&height=465')
.setTitle('LastFM')
.setDescription('**What is LastFm?**\n\nLast FM is a music website that allows you to \n keep track of your music listening habits, and share music with your friends!')


  //  message.channel.send(`${message.author}, looks like you needed some help.`)

        message.channel.send({embed: embed, component: buttons })


}


module.exports.help = {
    name:"lastfm",
    aliases: ["lastfm"]
  }