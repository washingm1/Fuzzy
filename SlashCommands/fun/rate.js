const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');
const ms = require("parse-ms");
const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');


module.exports = {
    name: "rate",
    description: "Give Fuzzy something to rate",
    options: [
        {
            name: 'rate',
            description: 'What are you rating?',
            required: true,
            type: 'STRING',
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
        let user = interaction.options.getUser('youruseroption') || interaction.user
        const guild = client.guilds.cache.get("646074330249429012");

        const [rate] = args

 
 
        let result = Math.floor(Math.random() * 100);


        let embed1 = new MessageEmbed()
        .setColor("#6051e8")
        .setDescription(`Fuzzy rates **${rate}** \`${result} out of 100\``);
        interaction.editReply({ embeds: [embed1]})



},
};