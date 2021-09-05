const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');


module.exports = {
    name: "sendmessage",
    description: "send a custom message to a channel",
    userPermissions: ["ADMINISTRATOR"],
 options: [
     {
         name: "channel",
         description: "channel to send to",
         required: true,
         type: "CHANNEL",
     },
     {
         name: 'title',
         description: 'Embed Title',
         required: true,
         type: "STRING",
     },
     {
         name: 'field1',
         description: 'First embed Field',
         required: true,
         type: "STRING",

     },
     {
         name: 'emoji',
         description: 'the reaction emoji',
         required: false,
         type: "STRING",
     }
 ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        console.log(interaction);
        await interaction.deferReply({ ephemeral: true}).catch(() => {});
        const [ channel, title, field1, emoji ] = args
        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user

        const pingEmbed = new MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`${client.ws.ping} ms`)
        

     //   await interaction.editReply({ embeds: [pingEmbed]});

        const channelToSend = interaction.guild.channels.cache.get(channel);

        const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(field1)
        .setAuthor(`${user.username}`, user.displayAvatarURL({ dynamic: true }))




        channelToSend.send({ embeds: [embed] }).then(() => interaction.followUp({ content: 'Sent your message'}))
    

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
