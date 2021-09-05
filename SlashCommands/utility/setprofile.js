
const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const db = require("quick.db");

module.exports = {
    name: "setprofile",
    description: "Set Up your custom profile",
   userPermissions: ['ADMINISTRATOR'],
 options: [
     {
         name: "channel",
         description: 'Channel to send to',
         required: true,
         type: "CHANNEL",
     },
     {
         name: "username",
         description: "To start, enter a name. This can be a nickname, your username, anything.",
         required: true,
         type: "STRING",
     },
     {
        name: 'about',
        description: "You can put anything here!",
        required: true,
        type: "STRING",
    },

     {
         name: 'country',
         description: 'Enter country, feel free to leave this blank',
         required: false,
         type: "STRING",
     },
     {
        name: 'album',
        description: 'What\'s your favorite album of all time?',
        required: false,
        type: "STRING",
    },
     {
         name: 'twitter',
         description: 'Put Twitter handle here, skipif you\'d like to leave blank',
         required: false,
         type: "STRING",
     },
     {
         name: 'instagram',
         description: 'Place Instagram @ here, if you\'d like to skip, leave blank',
         required: false,
         type: "STRING",

     },
     {
         name: 'other',
         description: 'Link any platform you want, if you make music, etc.',
         required: false,
         type: "STRING",
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
        const [ channel, username, country, about, twitter, instagram, other ] = args
        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user

        const pingEmbed = new MessageEmbed()
        .setTitle('Pong!')
        .setDescription(`${client.ws.ping} ms`)

     //   await interaction.editReply({ embeds: [pingEmbed]});

        db.set(`profileUsername_${guild.id}_${user.id}`, username)
        db.set(`profileCountry_${guild.id}_${user.id}`, country)
        db.set(`profileAbout_${guild.id}_${user.id}`, about)
        db.set(`profileTwitter_${guild.id}_${user.id}`, twitter)
        db.set(`profileInstagram_${guild.id}_${user.id}`, instagram)
        db.set(`profileOther_${guild.id}_${user.id}`, other)

        const channelToSend = interaction.guild.channels.cache.get(channel);


        const embed = new MessageEmbed()
        .setTitle(`${username}, set your profile?`)
        .setDescription('Here\'s what will show on your profile')
        .addField('Username', `${username}`)
        .addField('Country', `${country}`)
        .addField('About', `${about}`)
        .addField('Twitter', `${twitter}`)
        .addField('Instagram', `${instagram}`)
        .addField('Other', `${other}`)
        

        channelToSend.send({ embeds: [embed] }).then(() => interaction.followUp({ content: 'Sent your message'}))
    


    },
};
