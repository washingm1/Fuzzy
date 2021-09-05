const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
    name: "profile",
    description: "View your user profile",
    userPermissions: ["ADMINISTRATOR"],
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

     const username = db.fetch(`profileUsername_${guild.id}_${user.id}`)
        const country = db.fetch(`profileCountry_${guild.id}_${user.id}`)
      const about = db.fetch(`profileAbout_${guild.id}_${user.id}`)
        const twitter = db.fetch(`profileTwitter_${guild.id}_${user.id}`)
        const insta = db.fetch(`profileInstagram_${guild.id}_${user.id}`)
        const other = db.fetch(`profileOther_${guild.id}_${user.id}`)

        
        const canvas = Canvas.createCanvas(500,300);  
        const ctx = canvas.getContext('2d');
        
        let background = []
        
        background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/872159187549962260/hh_profilecard.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        const { registerFont, createCanvas } = require('canvas')
registerFont('./font/Neon.ttf', { family: 'Neon' }) 

        const userProfile = new MessageEmbed()
        .setTitle(`${user.username}'s profile`)
        .setDescription('Here\'s what will show on your profile')
        .addField('Username', `${username}`)
        .addField('Country', `${country}`)
        .addField('About', `${about}`)
        .addField('Twitter', `${twitter}`)
        .addField('Instagram', `${insta}`)
        .addField('Other', `${other}`)
        
        ctx.font = "24px Neon";
        ctx.textAlign - "center";
        ctx.fillStyle = '#000000';
        ctx.fillText(`${username}`, 300, 165);
        ctx.Line
        
        ctx.font = "20px Neon";
        ctx.textAlign - "center";
        ctx.fillStyle = '#000000';
        ctx.fillText(`${country}`, 425, 164);
        
        
        ctx.font = "25px Neon";
        ctx.textAlign - "center";
        ctx.fillStyle = '#000000';
        ctx.fillText(`${about}`, 300, 230);
        
        ctx.font = "25px Neon";
        ctx.textAlign - "center";
        ctx.fillStyle = '#000000';
        ctx.fillText(`${twitter}`, 380, 230);
        
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');


        interaction.editReply({files: [attachment]});


},
};