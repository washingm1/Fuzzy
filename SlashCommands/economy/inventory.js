const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');



module.exports = {
    name: "inventory",
    description: "Check what roles you have",

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

        let items = await db.fetch(user.id);
        if(items === null) items = "Nothing";
        console.log(user.id)
        console.log(items)
        const Embed = new MessageEmbed()
            .addField('Inventory', `${items}\n`)
            .setColor('RANDOM')
            .setTitle('Owned Items: ')
           interaction.editReply({embeds: [Embed]})

    }

};
