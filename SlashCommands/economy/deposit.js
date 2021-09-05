const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');



module.exports = {
    name: "deposit",
    description: "Deposit credits into the bank",
    options: [
        {
            name: "amount",
            description: 'Amount of credits to withdraw',
            required: true,
            type: "STRING",
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
    console.log(interaction)
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user


const [ amount ] = args

        let member = db.fetch(`money_${guild.id}_${user.id}`)
        let member2 = db.fetch(`bank_${guild.id}_${user.id}`)
      
        if (amount === 'all') {
          let money = await db.fetch(`money_${guild.id}_${user.id}`)
          let bank = await db.fetch(`bank_${guild.id}_${user.id}`)
      
          let embedbank = new MessageEmbed()
          .setColor('#FFFFFF')
          .setDescription(":x: You don't have any money to deposit")
      
          if(money === 0) return interaction.editReply({ embeds: [embedbank ]})
      
          db.add(`bank_${guild.id}_${user.id}`, money)
          db.subtract(`money_${guild.id}_${user.id}`, money)
          let embed5 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: You have deposited all your coins into your bank`);
        interaction.editReply({embeds: [embed5 ]})
        
        }
         else {
        let embed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: Specify an amount to deposit`);
        
        if (!amount) {
            return interaction.editReply({ embeds: [embed2] })
            .catch(err => console.log(err))
        }
        let embed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: You can't deposit negative money`);
      
        let embed4 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: You don't have that much money`);
      
        if (member < amount) {
            return interaction.editReply({ embeds: [embed4] })
        }
      
        let embed5 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: You have deposited ${amount} coins into your bank`);
      
        interaction.editReply({ embeds: [embed5 ]})
        db.add(`bank_${guild.id}_${user.id}`, amount)
        db.subtract(`money_${guild.id}_${user.id}`, amount)
        }
    },
};
