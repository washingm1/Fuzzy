const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');



module.exports = {
    name: "userinfo",
    description: "Check your user info!",
   
    options: [
{    name: 'userlookup',
description: 'Which user\'s information?',
required: false,
type: "USER",

}
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const [ userlookup ] = args
       // let user = `<@${userlookup}>` || interaction.user
       const guild = client.guilds.cache.get("646074330249429012");
        const user = await client.users.cache.get(userlookup) || interaction.user;
        const memberFetch = await guild.members.cache.get(userlookup) || interaction.member; 
       
        console.log(`User: ${user}`)
        console.log(`Member: ${memberFetch}`)
        console.log(`Slash: ${userlookup}`)


        var level = db.fetch(`guild_${guild.id}_level_${user.id}`) || 0;
        let money = await db.fetch(`money_${guild.id}_${user.id}`)
        let tokens = db.fetch(`token_${guild.id}_${user.id}`)
    
/*     const memberRoles = member.roles.cache
    .filter((roles) => roles.id !== guild.id)
    .map((role) => role.toString()); */
    
        const embed0 = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Info`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addField('Username',`${user.username}` + '#' + `${user.discriminator}`)
        .addField('ID', `${user.id}`)
        .addField('Join Date', `${memberFetch.joinedAt}`)
        .addField('Account Created At', `${user.createdAt}`)
        .addField('Highest Role',`${memberFetch.roles.highest}`)
        .setColor('RANDOM')
    
        console.log(memberFetch.displayHexColor)
      
    
        const embed1 = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Info`)
        .setThumbnail(memberFetch.user.displayAvatarURL({ dynamic: true }))
        .addField('Level', `${level}` ) // user, roles)
        .addField('Balance', `${money} Credits`)
    .addField('Tokens:', `${tokens}`)

        .setColor('RANDOM')

        interaction.editReply({ embeds: [embed0] })
    
},
};
