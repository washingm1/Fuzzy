const db = require('quick.db');
const Discord = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 

    let user = message.guild.members.cache.get(message.author.id)
 

    let he = new MessageButton()
    .setStyle('blurple')
    .setLabel('He/Him')
    .setID('he')



    let she = new MessageButton()
    .setStyle('blurple')
    .setLabel('She/Her')
    .setID('she')

    let they = new MessageButton()
    .setStyle('blurple')
    .setLabel('They/Them')
    .setID('they')

    let embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Pronouns')
    .setDescription('Choose your pronouns')
    .setThumbnail(message.guild.iconURL({ dynamic: true }))


  let buttons = new MessageActionRow()
    .addComponent(he)
    .addComponent(she)
    .addComponent(they)
   
message.channel.send({embed: embed, component: buttons}).then(msg => {msg.delete({ timeout: 15000 }) }).catch('error');

    bot.on('clickButton', async (button) => {

        if (button.id == 'he'){
button.defer()
            if (message.member.roles.cache.some(role => role.name === 'he/him')) {
   
                let embed2 = new Discord.MessageEmbed().setDescription(`You no longer have the ${message.guild.roles.cache.get('737371455041568840')} role!`);
            
                     user.roles.remove('737371455041568840'); 
                     return message.channel.send(embed2).then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
                     }else
                     
                   await message.guild.members.cache.get(user.id).roles.add('737371455041568840');
                        let embed = new Discord.MessageEmbed().setDescription(`You now have the ${message.guild.roles.cache.get('737371455041568840')} role!`);
                        message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');

                    };



                    if (button.id == 'she'){
button.defer()
                        if (message.member.roles.cache.some(role => role.name === 'she/her')) {
   
                            let embed2 = new Discord.MessageEmbed().setDescription(`You no longer have the ${message.guild.roles.cache.get('737371509840150548')} role!`);
                            
                                 user.roles.remove('737371509840150548'); 
                                 return message.channel.send(embed2).then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
                                 }else
                                 
                               await message.guild.members.cache.get(user.id).roles.add('737371509840150548');
                                    let embed = new Discord.MessageEmbed().setDescription(`You now have the ${message.guild.roles.cache.get('737371509840150548')} role!`);
                                    message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');

                                }                
                                if (button.id == 'they'){
button.defer()
                                    if (message.member.roles.cache.some(role => role.name === 'they/them')) {
       
                                        let embed2 = new Discord.MessageEmbed().setDescription(`You no longer have the ${message.guild.roles.cache.get('737371535123415052')} role!`);
                                        
                                             user.roles.remove('737371535123415052'); 
                                             return message.channel.send(embed2).then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
                                             }else
                                             
                                           await message.guild.members.cache.get(user.id).roles.add('737371535123415052');
                                                let embed = new Discord.MessageEmbed().setDescription(`You now have the ${message.guild.roles.cache.get('737371535123415052')} role!`);
                                                message.channel.send(embed).then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
                                                 
                                            }                  
    });










}

module.exports.help = {
    name: "pronoun",
    description: "Equip Role",
    aliases: ["pro"]
}