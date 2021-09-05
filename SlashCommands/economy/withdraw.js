const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');



module.exports = {
    name: "withdraw",
    description: "Withdraw credits from the bank",
   
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
        const [ amount ] = args
        let user = interaction.options.getUser('youruseroption') || interaction.user


        let member = db.fetch(`money_${guild.id}_${user.id}`)
        let member2 = db.fetch(`bank_${guild.id}_${user.id}`)
      
        if (amount == 'all') {
          let money = await db.fetch(`bank_${guild.id}_${user.id}`)
          
          db.subtract(`bank_${guild.id}_${user.id}`, money)
          db.add(`money_${guild.id}_${user.id}`, money)
          let embed5 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: You have withdrawn all your coins from your bank`);
        interaction.editReply({embeds: [embed5]})
        
        } else {
      
        let embed2 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: Specify an amount to withdraw`);
        
        if (!amount) {
            return interaction.editReply({embeds: [embed2]})
        }
        let embed3 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: You can't withdraw negative money`);
      
   
        let embed4 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:x: You don't have that much money in the bank`);
      
        if (member2 < amount) {
            return interaction.editReply({embeds: [embed4] })
        }

        if (member2 < 0) {
            return interaction.editReply({embeds: [embed3] })
        }
        let embed5 = new MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: You have withdrawn ${amount} coins from your bank`);
      
        interaction.editReply({ embeds: [embed5] })
        db.subtract(`bank_${guild.id}_${user.id}`, amount)
        db.add(`money_${guild.id}_${user.id}`, amount)
        }
    },
};
