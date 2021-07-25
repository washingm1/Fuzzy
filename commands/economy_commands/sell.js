const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
    
    let user = message.author;

    if(args[0] == 'tan') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:white_check_mark: > You don't have a Tan Role to sell`);

        let nike = await db.fetch(`tan_${message.guild.id}_${user.id}`)

        if (nike < 1) return message.channel.send(Embed2)
       
        db.fetch(`tan_${message.guild.id}_${user.id}`)
        db.subtract(`tan_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Sold Tan Role For 600 Coins`);

        db.add(`money_${message.guild.id}_${user.id}`, 600)
        message.channel.send(Embed3)
    } else if(args[0] == 'car') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:white_check_mark: > You don't have a Car to sell`);

       let cars = await db.fetch(`car_${message.guild.id}_${user.id}`)

        if (cars < 1) return message.channel.send(Embed2)
       
        db.fetch(`car_${message.guild.id}_${user.id}`)
        db.subtract(`car_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Sold a Car For 800 Coins`);

        db.add(`money_${message.guild.id}_${user.id}`, 800)
        message.channel.send(Embed3)
    } else if(args[0] == 'mansion') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:white_check_mark: > You don't have a Mansion to sell`);

        let houses = await db.fetch(`house_${message.guild.id}_${user.id}`)

        if (houses < 1) return message.channel.send(Embed2)
       
        db.fetch(`house_${message.guild.id}_${user.id}`)
        db.subtract(`house_${message.guild.id}_${user.id}`, 1)

        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Sold a Mansion For 1200 Coins`);

        db.add(`money_${message.guild.id}_${user.id}`, 1200)
        message.channel.send(Embed3)
    };

}
  
  module.exports.help = {
    name:"sell",
    aliases: [""]
  }