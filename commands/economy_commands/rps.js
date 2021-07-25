const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
const opponent = message.mentions.users.first();
if(!opponent) return message.channel.send(`Please mention who you want to fight`);
const { RPS } = require('rayzdev')
const game = new RPS({
    message: message,
    opponent: opponent, // NOT CHANGEABLE
    challenger: message.author, // NOT CHANGEABLE
    acceptMessage: "Click to fight with <@" + message.author + '>', // message sent to see if opponent accepts
})
game.start() // start the game
}

module.exports.help = {
    name:"rps",
    aliases: ["rock"]
  }
  
  
  