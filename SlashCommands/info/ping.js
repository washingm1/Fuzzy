const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');


module.exports = {
    name: "pinger",
    description: "returns websocket ping",
 
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        await interaction.defer({ ephemeral: true}).catch(() => {});

        const pingEmbed = new MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`${client.ws.ping} ms`)

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing Selected')
            .addOptions([
                {
                    label: 'Select Me',
                    description: "Description 1",
                    value: 'first_option',

                },
                {
                    label: 'Another selection',
                    description: "Another description",
                    value: 'second_option',
                },
            ]),
        );
        await interaction.reply({ embeds: [pingEmbed], ephemeral: true, components: [row] });
//interaction.webhook.editMessage()

const wait = require('util').promisify(setTimeout);

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'select') {
		await interaction.deferUpdate();
		await wait(4000);
		await interaction.editReply({ content: 'You chose the first menu option', components: [] });
	}
});

    },
};
