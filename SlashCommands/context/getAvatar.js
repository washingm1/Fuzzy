const { Client, CommandInteraction, Message, MessageEmbed, ContextMenuInteraction } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');


module.exports = {
    name: "Get Avatar",
    type: 'USER',
   
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */



    run: async (client, interaction, args) => {
        const guild = client.guilds.cache.get("646074330249429012");
            const user = await client.users.fetch(interaction.targetId);
            
            const embed = new MessageEmbed()
            .setAuthor(`${user.tag}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true }));


            interaction.followUp({embeds: [embed] })
    },
};
