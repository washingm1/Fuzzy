const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');



module.exports = {
    name: "balance",
    description: "Check your balance",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
  console.log(interaction)
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

const row = new MessageActionRow() 
.addComponents(
  new MessageButton()
  .setCustomId('primary')
  .setLabel('Primary')
  .setStyle('PRIMARY')
    )
let user = interaction.options.getUser('youruseroption') || interaction.user
const guild = client.guilds.cache.get("646074330249429012");

let bal = db.fetch(`money_${guild.id}_${user.id}`)

if (bal === null) bal = 0;

let bank = await db.fetch(`bank_${guild.id}_${user.id}`)
if (bank === null) bank = 0;

let tokens = db.fetch(`token_${guild.id}_${user.id}`)
if (tokens === null) tokens = 0;


let rob = await db.fetch(`robToken_${guild.id}_${user.id}`)
if (rob === null) rob = 0;

 
let moneyEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`${user.username}'s Balance`)
.setColor('RANDOM')
.setDescription(`**Pocket**\n${bal} credits\n**Bank**\n${bank} credits\n**Tokens**\n${tokens} tokens\n**Rob Tokens**\n${rob} tokens`)


       await interaction.followUp({ephemeral: true, embeds: [moneyEmbed], });
    },
};
