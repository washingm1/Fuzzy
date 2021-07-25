const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
    
    let user = message.mentions.users.first() || message.author;

    if(args[0] == 'tan') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: User doesn't have the tan role`);

        let tanRole = await db.fetch(`tan_${message.guild.id}_${user.id}`)

        if (tanRole < 1) return message.channel.send(Embed2)
       
        db.fetch(`tan_${message.guild.id}_${user.id}`)
        db.subtract(`tan_${message.guild.id}_${user.id}`, 1)
        await message.guild.members.cache.get(user.id).roles.remove('813153522760679444');
       
        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Removed tan role`);
        message.channel.send(Embed3)
    } else if(args[0] == 'red') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: User doesn't have the red role`);

       let redd = await db.fetch(`red_${message.guild.id}_${user.id}`)

        if (redd < 1) return message.channel.send(Embed2)
       
        db.fetch(`red_${message.guild.id}_${user.id}`)
        db.subtract(`red_${message.guild.id}_${user.id}`, 1)
        await message.guild.members.cache.get(user.id).roles.remove('733373020491481219');
        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`<:Check:618736570337591296> Removed red role`);

    
        message.channel.send(Embed3)
    };

}
  
  module.exports.help = {
    name:"removeinv",
    aliases: [""]
  }