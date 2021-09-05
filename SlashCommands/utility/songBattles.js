const { Client, CommandInteraction, Message, MessageEmbed, MessageAttachment } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const { resolveNaptr } = require("node:dns");
const { songs } = require("f:/economybot-master/commands/arrays/songs");
const Discord = require("discord.js");
const Canvas = require('canvas');
const { channel } = require("diagnostics_channel");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("node:constants");
const moment = require ('moment')

module.exports = {
    name: "songbattle",
    description: "May the best song win",
   userPermissions: ["ADMINISTRATOR"],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        let user = interaction.options.getUser('youruseroption') || interaction.user
        const guild = client.guilds.cache.get("646074330249429012");

        var max = songs.length;
        var min = songs.length / 2;

        let result = Math.floor((Math.random() * songs.length));

        let result2 = Math.floor((Math.random() * songs.length));

        

       const { registerFont, createCanvas } = require('canvas')
registerFont('./font/Neon.ttf', { family: 'Neon' }) 


const canvas = Canvas.createCanvas(500,300);  
const ctx = canvas.getContext('2d');

let background = []

background = await Canvas.loadImage('https://media.discordapp.net/attachments/733319258351730693/878674919997722624/songBattle.png');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.font = "Bold 25px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000'; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText(`${songs[result].name}`, 250, 50);

ctx.font = "Bold 16px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000'; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText(`${songs[result].album}`, 95, 240);



ctx.font = "Bold 25px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000'; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText(`${songs[result2].name}`, 250, 270);

ctx.font = "Bold 16px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000'; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText(`${songs[result2].album}`, 390, 240);



const albumCover1 = await Canvas.loadImage(`${songs[result].image}`);
ctx.drawImage(albumCover1, 35, 74, 147, 147);

const albumCover2 = await Canvas.loadImage(`${songs[result2].image}`);
ctx.drawImage(albumCover2, 318, 74, 147, 147);



const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'songBattle.png');

let clicked = 0;


    const row = new MessageActionRow() 
    .addComponents(
      new MessageButton()
      .setCustomId('first')
      .setLabel(`${songs[result].name}`)
      .setStyle('PRIMARY')
    ,
    new MessageButton()
    .setCustomId('second')
    .setLabel(`${songs[result2].name}`)
     .setStyle('PRIMARY')
        )


        const channel = interaction.guild.channels.cache.get('733063871266422914');
        
        let option1 = 0;
        let option2 = 0;

        let embed = await new MessageEmbed()
        .setTitle('Today\'s Song Battle')
        .setDescription(`**${songs[result].name} - ${songs[result].album}** has: **${option1} votes** \n\n **VS** \n\n**${songs[result2].name} - ${songs[result2].album}** has: **${option2} votes**`)
        .setColor('RANDOM')
        .setImage('attachment://songBattle.png')
        .setTimestamp()

interaction.editReply({ embeds: [embed], files: [attachment], components: [row] })//.then(() => interaction.followUp({ content: 'Sent your message'}));


const collector = interaction.channel.createMessageComponentCollector({
    time: 604800000,
  });


collector.on('collect', async (ButtonInteraction) => {

    const id = ButtonInteraction.customId;
    if (id == 'first'){
        clicked++;
        option1++;
        let embed = await new MessageEmbed()
        .setTitle('Today\'s Song Battle')
        .setDescription(`**${songs[result].name} - ${songs[result].album}: ${option1} votes** \n\n **VS** \n\n**${songs[result2].name} - ${songs[result2].album}: ${option2} votes**`)
        .setColor('RANDOM')
        .setImage('attachment://songBattle.png')
        .setTimestamp()

        await interaction.editReply({ embeds: [embed], components: [row]  });
        interaction.channel.send({ content: `${ButtonInteraction.user.username} clicked ${option1}`})
     }

     if (id == 'second'){
       clicked++;
        option2++;
        let embed = await new MessageEmbed()
        .setTitle('Today\'s Song Battle')
        .setDescription(`**${songs[result].name} - ${songs[result].album}: ${option1} votes** \n\n **VS** \n\n**${songs[result2].name} - ${songs[result2].album}: ${option2} votes**`)
        .setColor('RANDOM')
        .setImage('attachment://songBattle.png')
        .setTimestamp()

        await interaction.editReply({ embeds: [embed], components: [row]  });
        channel.send({ content: `${ButtonInteraction.user.username} clicked ${option2}`})
     }




});

collector.on('end', collected => {
    let embed = new MessageEmbed()
    .setTitle('Today\'s Song Battle\'s Results')
    .setDescription(`Voting over!\n\n${songs[result].name} finished with **${option1} votes!** \n\n${songs[result2].name} has **${option2} votes!**`)
    .setColor('RANDOM')
    .setImage('attachment://songBattle.png')
    .setTimestamp()


    console.log(`Collected ${collected.size} items`);
    interaction.editReply({ embeds: [embed], components: [] })
  });


  

},
};





