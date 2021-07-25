const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');



module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
    let user = message.guild.members.cache.get(message.author.id)

    let profile1 = 'https://media.discordapp.net/attachments/492703825287839754/859788998976208906/profilecard2.png' //Fuzzybrain
    let daily1 = 'https://media.discordapp.net/attachments/492703825287839754/859817351881293844/dailycard_fuzzybrain.png'

    let profile2 = 'https://media.discordapp.net/attachments/732757852615344139/854063817512583218/profilecard.png' //Full House
    let daily2 = 'https://media.discordapp.net/attachments/492703825287839754/859460974716125194/dailycard_fullhouse.png'

    let profile3 = 'https://media.discordapp.net/attachments/492703825287839754/856304739239460914/profilecard3.png' //Boat
    let daily3 = 'https://media.discordapp.net/attachments/492703825287839754/859461031105790012/dailycard_boat.png'

    let profile4 = 'https://media.discordapp.net/attachments/492703825287839754/859460388411801600/dailycard_harmony.png' //HH
    let daily4 = 'https://media.discordapp.net/attachments/732757852615344139/859822475612127282/dailycard_harmony.png'

    if (!args[0]){
        message.channel.send('Not a valid background, please choose from [fuzzybrain, fullhouse, harmony, boat]')
    }
    
if (args[0] == 'fuzzybrain') {

    const profile = profile1
    const dailyBackground = daily1

     let confirm = new Discord.MessageEmbed()
        .setDescription('You now have the Fuzzybrain background!')
        .setColor('RANDOM')
        message.channel.send(confirm)
        db.set(`profile_${message.guild.id}_${user.id}`, profile1)
        db.set(`dailyBack_${message.guild.id}_${user.id}`, daily1)

        let profileFont = 'College2.otf'
        let fontFamily = 'College2'

        module.exports = { profile, profileFont, fontFamily, dailyBackground};

} else if (args[0] == 'fullhouse'){
     const profile = profile2
     const dailyBackground = daily2
     
        let confirm = new Discord.MessageEmbed()
        .setDescription('You now have the Full House background!')
        .setColor('RANDOM')

        let profileFont = 'Truckin.ttf'
        let fontFamily = 'Truckin'

        db.set(`profile_${message.guild.id}_${user.id}`, profile2)
        db.set(`dailyBack_${message.guild.id}_${user.id}`, daily2)
        message.channel.send(confirm)
      
        module.exports = { profile, profileFont, fontFamily, dailyBackground };

}  else if (args[0] == 'boat'){
    const profile = profile2
    const dailyBackground = daily3

    let confirm = new Discord.MessageEmbed()
    .setDescription('You now have the Boat background!')
    .setColor('RANDOM')

    let profileFont = 'Truckin.ttf'
    let fontFamily = 'Truckin'

    db.set(`profile_${message.guild.id}_${user.id}`, profile3)
    db.set(`dailyBack_${message.guild.id}_${user.id}`, dailyBackground)

    message.channel.send(confirm)
  
    module.exports = { profile, profileFont, fontFamily, dailyBackground };

}
else if (args[0] == 'harmony'){

        const profile = profile4
        const dailyBackground = daily4

        let confirm = new Discord.MessageEmbed()
        .setDescription('You now have the Harmony House background!')
        .setColor('RANDOM')
        message.channel.send(confirm)
        db.set(`profile_${message.guild.id}_${user.id}`, profile4)
        db.set(`dailyBack_${message.guild.id}_${user.id}`, daily4)
        let profileFont = 'Truckin.ttf'
        let fontFamily = 'Truckin'

        module.exports = { profile, profileFont, fontFamily, dailyBackground};

} 

}

module.exports.help = {
    name: "profileset",
    description: "Set Profile Background",
    aliases: ["proset"]
}
