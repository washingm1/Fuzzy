
const { channel } = require("diagnostics_channel");
const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: "report",
    description: "Report a user, or a problem in the server.",
   
 options: [
     {
         name: "report",
         description: 'What would you like to report?',
         required: true,
         type: "STRING",
     },
     {
         name: "staff",
         description: "Who would you like to send this to? If blank, it will be sent to staff channel.",
         required: false,
         type: "USER",
     },
 ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


     run: async (client, interaction, args) => {

        console.log(interaction);
        await interaction.deferReply({ ephemeral: true }).catch(() => {});
        const [ report, staff ] = args

        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user

   

        const channel = interaction.guild.channels.cache.get('798633241535447081');
   

        const embed = new MessageEmbed()
        .setTitle(`${user.username} has submitted a report`)
        .setDescription(`${report}`)
        .setTimestamp()
        .setAuthor(`${user.username}`, user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM');

if(staff == null) return channel.send({ embeds: [embed] }).then(() => interaction.followUp({ content: 'Sent your message'}));


interaction.options.getUser('staff').send({ embeds: [embed] }).then(() => interaction.followUp({ content: 'Sent your message'}));
           
        
        

     
    


    },
};
