const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');



module.exports = {
    name: "clearinventory",
    description: "Clear roles from inventory",
    userPermissions: ["ADMINISTRATOR"],

    options: [
        {
            name: "target",
            description: 'User to add tokens to',
            required: true,
            type: "USER",
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

        await interaction.deferReply({ ephemeral: true}).catch(() => {});
        let user = interaction.options.getUser('youruseroption') || interaction.user

        const [ target ] = args
        let items = await db.fetch(user.id);
        if(items === null) items = "Nothing"

        const guild = client.guilds.cache.get("646074330249429012");

        const member = interaction.options.getMember('target');


    interaction.editReply(`Successfully wiped <@${target}>'s inventory`)

        db.fetch(`${target, items}`, []);
        db.delete(target, items)
},
};
