const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');




module.exports = {
    name: "userinfo",
    description: "check your user/guild info",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


run: async (client, interaction, args) => {
    await interaction.defer({ ephemeral: true}).catch(() => {});

    const row = new MessageActionRow() 
    .addComponents(
      new MessageButton()
      .setCustomId('prev')
      .setLabel('Back')
      .setStyle('PRIMARY')
,
      new MessageButton()
        .setCustomId('next')
        .setLabel('Next')
        .setStyle('PRIMARY')
        )
    let user = interaction.options.getUser('youruseroption') || interaction.user
    const guild = client.guilds.cache.get("646074330249429012");

    let member = interaction.options.getUser('youruseroption') || interaction.member;
    
    var level = db.fetch(`guild_${guild.id}_level_${user.id}`) || 0;
    let money = await db.fetch(`money_${guild.id}_${user.id}`)
    let tokens = db.fetch(`token_${guild.id}_${user.id}`)
    
    const memberRoles = member.roles.cache
    .filter((roles) => roles.id !== guild.id)
    .map((role) => role.toString());
    
    const embed0 = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Info`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField('Username', `${user.username} #${user.discriminator}`)
    .addField('ID', `${user.id}`)
    .addField('Join Date', `${member.joinedAt}`)
    .addField('Account Created At', `${user.createdAt}`)
    .addField('Highest Role',`${member.roles.highest}`)
    .setColor('RANDOM')
    
    console.log(member.displayHexColor)
    
    
    const embed1 = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Info`)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .addField('Level', `${level}` ) // user, roles)
    .addField('Balance', `${money} Credits`)
    .addField('Tokens:', `${tokens}`)
    .addField('All Roles', `${memberRoles}`)
    .setColor('RANDOM')


    
       await interaction.followUp({ephemeral: true, embeds: [embed0], components: [row]});

const wait = require('util').promisify(setTimeout);
       client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;
    
        if (interaction.customId === 'next') {
            await interaction.deferUpdate();
            await wait(4000);
            await interaction.editReply({ embeds: [embed1], components: [row] });
        }
    });
    },
};
