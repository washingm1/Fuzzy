
const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const db = require("quick.db");


module.exports = {
    name: "suggest",
    description: "Suggest new features for the server!",
   
 options: [
     {
         name: "suggestion",
         description: 'What would you like to suggest?',
         required: true,
         type: "STRING",
     },
 ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     * @param {Message} message
     */


     run: async (client, interaction, args) => {

        console.log(interaction);
        await interaction.deferReply({ ephemeral: true }).catch(() => {});
        const [ suggestion ] = args

        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user

   

        const suggestChannel = interaction.guild.channels.cache.get('735215485263544401');
        
        //735215485263544401
        const embed = new MessageEmbed()
        .setTitle(`${user.username} has a suggestion`)
        .setDescription(`${suggestion}`)
        .setTimestamp()
        .setAuthor(`${user.username}`, user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .setFooter('Goal: 10 stars')


        const ABC = await suggestChannel.send({embeds: [embed] })

        interaction.followUp({ content: 'Sent Message' })

        const thread = await suggestChannel.threads.create({
            name: `${user.username}'s Suggestion'`,
            autoArchiveDuration: 60,
            reason: `${suggestion}`,
        });
        
        console.log(`Created thread: ${thread.name}`);

        ABC.react('⭐')

    },
};
