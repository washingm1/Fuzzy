const { Client, CommandInteraction, MessageEmbed, Message } = require("discord.js");
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const db = require("quick.db");
const Canvas = require('canvas');

module.exports = {
    name: "selfroles",
    description: "Choose your roles",
   
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
  await interaction.deferReply({ ephemeral: true });
  let user = interaction.options.getUser('youruseroption') || interaction.user
  
  const row = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('roles')
      .setPlaceholder('Nothing selected')

      .addOptions([
        {
          label: 'Twitter Alerts',
          description: 'Get the Twitter alerts role',
          value: 'twitter',
          emoji: '🔵',
        },
        {
          label: 'YouTube Alerts',
          description: 'Get the YouTube alerts role',
          value: 'youtube',
          emoji: '🔴',
        },
        {
          label: 'Alerts',
          description: 'Get alerted for Dayglow & server related news',
          value: 'alerts',
          emoji: '🔔',
        },
        {
            label: 'He/Him',
            description: 'Get the He/Him pronoun role',
            value: 'he',
            emoji: '♾️',
          },
          {
            label: 'She/Her',
            description: 'Get the She/Her pronoun role',
            value: 'she',
            emoji: '♾️',
          },
          {
            label: 'They/Them',
            description: 'Get the They/Them pronoun role',
            value: 'they',
            emoji: '♾️',
          },
          {
            label: 'Ask Pronouns',
            description: 'Get the Ask Pronouns pronoun role',
            value: 'askpro',
            emoji: '♾️',
          },
          {
            label: 'Song Battle',
            description: 'Get alerted for each week\'s song battle',
            value: 'songbattle',
            emoji: '🎤',
          },
          {
            label: 'Tour Goer',
            description: 'Going to a Harmony House show? Let people know!',
            value: 'tourgoer',
            emoji: '🎉',
          },
          {
            label: 'Fuzzybrain',
            description: 'Represent your favorite album',
            value: 'fuzzyalbum',
            emoji: '🎵',
          },
          {
            label: 'Harmony House',
            description: 'Represent your favorite album',
            value: 'hhrole',
            emoji: '🎵',
          },
      ]),
  );

  let twitterRole = interaction.guild.roles.cache.get(`${'868574896383475753'}`)
  let youtubeRole = interaction.guild.roles.cache.get(`${'868573291567255592'}`)
  let alertsRole = interaction.guild.roles.cache.get(`${'740221831197360237'}`)
  let songBattleRole = interaction.guild.roles.cache.get(`${'883033680065470555'}`)
  let heRole = interaction.guild.roles.cache.get(`${'737371455041568840'}`)
  let sheRole = interaction.guild.roles.cache.get(`${'737371509840150548'}`)
  let theyRole = interaction.guild.roles.cache.get(`${'737371535123415052'}`)
  let askRole = interaction.guild.roles.cache.get(`${'883034644688281600'}`)
  let tourRole =  interaction.guild.roles.cache.get(`${'883385807237414933'}`)
let hhrole = interaction.guild.roles.cache.get(`${'883386116194045953'}`)
let fuzzyRole = interaction.guild.roles.cache.get(`${'883386011902685245'}`)


let member = await interaction.guild.members.fetch(user.id);

  const roleEmbed = new MessageEmbed()
      .setTitle('Choose Roles')
      .setDescription(
          `🔵 ${twitterRole} Get alerted for Dayglow\'s tweet\n\n🔴${youtubeRole} Get alerted for new Dayglow YouTube videos\n\n🔔 ${alertsRole} Get notified for Dayglow & server related news\n\n${songBattleRole} Get alerts for each week\'s song battle\n\n${hhrole} & ${fuzzyRole} Represent your favorite Dayglow album\n\n${tourRole} Attending a Harmony House show? Let people know!`
      )

 await interaction.editReply({ embeds: [roleEmbed], components: [row] })


 const collector = interaction.channel.createMessageComponentCollector({
  time: 60000,
});


collector.on('collect', (SelectMenuInteraction) => {
if (SelectMenuInteraction.user.id !== interaction.user.id) return console.log('Button clicker is not author');
const id = SelectMenuInteraction.values[0];

    if(id === "twitter") {
      if (member.roles.cache.has(`868574896383475753`)) {
        let embed = new MessageEmbed().setDescription('Removed role')
        .setColor('RANDOM');
          member.roles.remove('868574896383475753')
        return interaction.editReply({ embeds: [roleEmbed], components: [row] });
       }
         interaction.guild.members.cache.get(user.id).roles.add('868574896383475753');
        interaction.editReply({ content: `Assigned ${twitterRole}`, embeds: [roleEmbed], components: [row] })
    }




  if(id === "youtube") {
    if (member.roles.cache.has(`868573291567255592`)) {
      let embed = new MessageEmbed().setDescription('Removed role')
      .setColor('RANDOM');
        member.roles.remove('868573291567255592')
      return interaction.editReply({ embeds: [roleEmbed], components: [row] });
     }
      interaction.guild.members.cache.get(user.id).roles.add('868573291567255592');
     interaction.editReply({ content: `Assigned ${youtubeRole}`, embeds: [roleEmbed], components: [row] })
 }



 if(id === "alerts") {
  if (member.roles.cache.has(`740221831197360237`)) {

      member.roles.remove('740221831197360237')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('740221831197360237');
 interaction.editReply({content: `Assigned ${alertsRole}`, embeds: [roleEmbed], components: [row] })
}

if(id === "he") {
  if (member.roles.cache.has(`737371455041568840`)) {

      member.roles.remove('737371455041568840')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('737371455041568840');
 interaction.editReply({ content: `Assigned ${heRole}`, embeds: [roleEmbed], components: [row] })
}

if(id === "she") {
  if (member.roles.cache.has(`737371509840150548`)) {

      member.roles.remove('737371509840150548')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('737371509840150548');
 interaction.editReply({ content: `Assigned ${sheRole}`, embeds: [roleEmbed], components: [row] })
}


if(id === "they") {
  if (member.roles.cache.has(`737371535123415052`)) {

      member.roles.remove('737371535123415052')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('737371535123415052');
 interaction.editReply({content: `Assigned ${theyRole}`, embeds: [roleEmbed], components: [row] })
}




if(id === "askpro") {
  if (member.roles.cache.has(`883034644688281600`)) {

      member.roles.remove('883034644688281600')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('883034644688281600');
 interaction.editReply({content: `Assigned ${askRole}`, embeds: [roleEmbed], components: [row] })
}




if(id === "songbattle") {
  if (member.roles.cache.has(`883033680065470555`)) {

      member.roles.remove('883033680065470555')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('883033680065470555');
 interaction.editReply({content: `Assigned ${songBattleRole}`, embeds: [roleEmbed], components: [row] })
}


if(id === "tourgoer") {
  if (member.roles.cache.has(`883385807237414933`)) {

      member.roles.remove('883385807237414933')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('883385807237414933');
 interaction.editReply({content: `Assigned ${tourRole}`, embeds: [roleEmbed], components: [row] })
}



if(id === "fuzzyalbum") {
  if (member.roles.cache.has(`883386011902685245`)) {

      member.roles.remove('883386011902685245')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('883386011902685245');
 interaction.editReply({content: `Assigned ${fuzzyRole}`, embeds: [roleEmbed], components: [row] })
}

if(id === "hhrole") {
  if (member.roles.cache.has(`883386011902685245`)) {
      member.roles.remove('883386011902685245')
    return interaction.editReply({ embeds: [roleEmbed], components: [row] });
   }
  interaction.guild.members.cache.get(user.id).roles.add('883386011902685245');
 interaction.editReply({content:`Assigned ${hhrole}`, embeds: [roleEmbed], components: [row] })
}





});



},
}