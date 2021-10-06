const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');



module.exports = {
    name: "pay",
    description: "Give credits to a user",


    options: [
        {
            name: "target",
            description: 'User to add credits to',
            required: true,
            type: "USER",
        },
        {
            name: "amount",
            description: "Amount to add",
            required: true,
            type: "INTEGER",
        }
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
        const [ target , amount ] = args

        const guild = client.guilds.cache.get("646074330249429012");

        const member = interaction.options.getMember('target');

        const userBalance =  db.fetch(`money_${guild.id}_${interaction.user.id}`)
        
    if (!amount) return interaction.reply('Please specify an amount to add.')
    if (isNaN(amount)) return interaction.reply('That was not a valid number!')
    if(target == interaction.user.id) return interaction.editReply({ content: 'You can\'t pay yourself' });

    console.log(userBalance)
    console.log(amount)

    if (amount > userBalance){
        return interaction.editReply({ content: 'You don\'t have that much money' });
    }


    interaction.editReply('Successfully added ' + amount + ' credits to ' + `<@${target}>`)
    db.add(`money_${guild.id}_${target}`, amount)
    db.subtract(`money_${guild.id}_${interaction.user.id}`, amount)
},
};
