const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');



module.exports = {
    name: "rob",
    description: "Rob another user",
    options: [
        {
            name: "target",
            description: 'Who would you like to rob?',
            required: true,
            type: "USER",
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
    console.log(interaction)
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user


const [ target ] = args

let targetuser = await db.fetch(`money_${guild.id}_${target}`)


let amount =  Math.floor(Math.random() * 200) + 15;

if (amount > targetuser) amount = amount - 50;

let rob = await db.fetch(`robToken_${guild.id}_${user.id}`)

console.log(rob + ' rob token')

if (user.id == target) {

  return interaction.editReply({content: "You cannot rob yourself"});

} else

if (rob < 1) {
 let timeEmbed = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`You don't have any rob tokens!`);
  return interaction.editReply({embeds: [timeEmbed]})
} 
 



let moneyEmbed2 = new Discord.MessageEmbed()
  .setColor("#FFFFFF")
  .setDescription(`🚫 <@${target}> does not have anything you can rob`);
if (targetuser <= 0) {
    return interaction.editReply({embeds: [moneyEmbed2]})
}

let testChance =  Math.floor(Math.random() * 100) + 1;

console.log(testChance)
    // 5 here is percentage of success.
    if ((testChance -= 40) < 0) {
        // Success!
        let embed = new Discord.MessageEmbed()
        .setTitle('Like a Thief in the Night...')
        .setDescription(`💰 You robbed <@${target}> and got away with ${amount} coins!`)
        .setColor("RANDOM")
        interaction.editReply({embeds: [embed]})
         db.subtract(`robToken_${guild.id}_${user.id}`, 1)

        db.subtract(`money_${guild.id}_${target}`, amount)

        db.add(`money_${guild.id}_${user.id}`, amount)
       
      
    } else {
       
        interaction.editReply({content: `**${user.username}**, Your robbery failed, how do you feel about that?`});
        db.subtract(`robToken_${guild.id}_${user.id}`, 1)
        
    }


        }
};
