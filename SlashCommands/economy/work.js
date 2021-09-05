const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');
const ms = require("parse-ms");
const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');


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

    let timeout = 1800000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new MessageEmbed()
        .setTitle('Try again Later')
        .setColor("#6051e8")
        .setDescription(`🚫You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        interaction.editReply({embeds: [timeEmbed] })
      } else {

        let replies = ['Cashier','Uber Driver','Crash Test Dummy','Telemarketer','Waiter','Doordash Driver', 'producer on FL Studio', 'Mafia Boss','Car salesman', 'Bedroom Pop artist' ]

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;

        let embed1 = new MessageEmbed()
        .setColor("#6051e8")
        .setTitle('Good Work!')
        .setDescription(`:white_check_mark: You worked as a ${replies[result]} and earned ${amount} coins`);
        interaction.editReply({ embeds: [embed1]})
        
        db.add(`money_${guild.id}_${user.id}`, amount)
        db.set(`work_${guild.id}_${user.id}`, Date.now())

        db.add(`working_${guild.id}_${user.id}`, 1)

        let workUses = db.fetch(`working_${guild.id}_${user.id}`)

    
        if (workUses === 50){
            interaction.channel.send(`You have used daily ${workUses} times, and have earned the `)
          }
          if (workUses === 100){
            interaction.channel.send(`You have used daily ${workUses} times, and have earned the `)
          }
    };
},
};