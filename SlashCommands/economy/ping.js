const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');


module.exports = {
    name: "ping",
    description: "get bot ping",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



    run: async (client, interaction, args) => {

        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const guild = client.guilds.cache.get("646074330249429012");
        

        const pingEmbed = new MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`${client.ws.ping} ms`)
        .setColor('RANDOM')
     //   await interaction.editReply({ embeds: [pingEmbed]});

  

        interaction.channel.send({ embeds: [pingEmbed] });
    

const wait = require('util').promisify(setTimeout);

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;


});

    },
};
