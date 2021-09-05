const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');



module.exports = {
    name: "addxp",
    description: "Add XP to a specified user",
    userPermissions: ["ADMINISTRATOR"],

    options: [
        {
            name: "target",
            description: 'User to add XP to',
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

        await interaction.deferReply({ ephemeral: true}).catch(() => {});
        const [ target , amount ] = args

        const guild = client.guilds.cache.get("646074330249429012");

        const member = interaction.options.getMember('target');

        
    if (!amount) return interaction.reply('Please specify an amount to add.')
    if (isNaN(amount)) return interaction.reply('That was not a valid number!')


    interaction.editReply('Successfully added ' + amount + ' token(s) to ' + `<@${target}>`)

    interaction.editReply({ content: 'Successfully added ' + amount + ' token(s) to ' + `<@${target}>`})
    db.add(`guild_${guild.id}_xp_${target}`, amount)
},
};
