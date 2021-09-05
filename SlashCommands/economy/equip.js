const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { guildRoles } = require("f:/economybot-master/commands/arrays/roles_array");




module.exports = {
    name: "equip",
    description: "Equip a Role by mentioning it",
    options: [
        {
            name: "role",
            description: "Which role do you want to equip?",
            required: true,
            type: "ROLE",
        },
    
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


run: async (client, interaction, args) => {
    console.log(interaction)
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
const [ role ] = args
let checkInv = `${role.toString().replace('<@&', '').replace('>', '')}`

    //Removing any currently equipped color roles
// you can use map here to get an array of roleids
let hasRoles = guildRoles.map((r) => r.roleid);
let user = interaction.options.getUser('youruseroption') || interaction.user;
let guild = client.guilds.cache.get('646074330249429012');
// did you mean fetch?
let member = await guild.members.fetch(user.id);

let items = await db.fetch(user.id);
if(items === null) items = "Nothing";

let memberRoles = member.roles.cache
  .filter((role) => hasRoles.includes(role.id))
  .map((role) => role.toString());

//Replacing the characters around the ID so it will actually remove the characters
  let rolesID = `${memberRoles.toString().replace('<@&', '').replace('>', '')}`

console.log(rolesID);   

//Checking if user has role in Inventory
if (!items.includes(`${guild.roles.cache.get(`${checkInv}`)}`)){
    let rejectEmbed = new MessageEmbed()
    .setDescription('You do not own this role!')
    .setColor('RANDOM');
    return await interaction.editReply({ephemeral: true, embeds: [rejectEmbed] });
  }
  else //Checking if User has role equipped
   if (member.roles.cache.has(`${checkInv}`)) {
      let embed = new MessageEmbed().setDescription('You already have this role!')
      .setColor('RANDOM');
      return await interaction.editReply({ephemeral: true, embeds: [embed] });
     }
     else if (member.roles.cache.has(`${rolesID}`)){
       
        await member.roles.remove(`${rolesID}`)
     }


     await guild.members.cache.get(user.id).roles.add(`${checkInv}`);
     let equipped = new MessageEmbed()
        .setDescription(`Successfully equipped <@&${role}>!`)
        .setColor('RANDOM')
     await interaction.editReply({ embeds: [equipped], components: [] })

    },
};
