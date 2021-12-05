const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');
const ms = require("parse-ms");
const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');
const toMilliseconds = require('to-milliseconds');
const now = new Date();

module.exports = {
    name: "work",
    description: "Get a random amount of credits for working",
   
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
    console.log(interaction)
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        
        let user = interaction.options.getUser('youruseroption') || interaction.user
        const guild = client.guilds.cache.get("646074330249429012");
        let author = await db.fetch(`work_${guild.id}_${user.id}`)
        
        let cmdChannel = interaction.guild.channels.cache.get("733043770454704189")
        let returnEmbed = new MessageEmbed()
        .setTitle('Oops!')
        .setDescription(`Please use ${cmdChannel} for any bot commands`)
    //    if (interaction.channel !== cmdChannel) return interaction.followUp({ embeds: [returnEmbed] });

    let timeout = 1800000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {

        let time = ms(timeout - (Date.now() - author));

        const timeInMs = toMilliseconds.convert(time)

        const totalTime = now.valueOf() + timeInMs;
       var printTime = totalTime.toString().slice(0,10)
      
        let timeEmbed = new MessageEmbed()
        .setTitle('Try again Later')
        .setColor("#6051e8")
        .setDescription(`🚫You have already worked recently\n\nTry again in <t:${printTime}:R>`);
        interaction.editReply({embeds: [timeEmbed] })
      } else {

        let replies = ['a Cashier',
        'an Uber Driver',
        'a Crash Test Dummy',
        'a Telemarketer',
        'a Waiter',
        'a Doordash Driver', 
        'a producer on FL Studio',
         'a Mafia Boss',
        'a Car salesman',
         'a Bedroom Pop artist',
        'a Dog Walker',
        'a Youtuber',
      'a Twitch Streamer',
      'a Tree salesperson']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;

        let embed1 = new MessageEmbed()
        .setColor("#6051e8")
        .setTitle('Good Work!')
        .setDescription(`:white_check_mark: You worked as ${replies[result]} and earned ${amount} coins`);

        let workMsg = interaction.editReply({ embeds: [embed1]})

        if (amount === 69) workMsg.react(':verynice:885370854647664681');
        
        db.add(`money_${guild.id}_${user.id}`, amount)
        db.set(`work_${guild.id}_${user.id}`, Date.now())

        db.add(`working_${guild.id}_${user.id}`, 1)

        let workUses = db.fetch(`working_${guild.id}_${user.id}`)

    
  
          if (workUses === 100){
            interaction.channel.send(`You have used daily ${workUses} times, and have earned the \`HARD WORKER\` badge!`)
          }
          if (workUses === 250){
            interaction.channel.send(`You have used daily ${workUses} times, and have earned the \`WORK HORSE\` badge!`)
          }
          if (workUses === 500){
            interaction.channel.send(`You have used daily ${workUses} times, and have earned the \`WORK MACHINE\` badge!`)
          }
    };
},
};
