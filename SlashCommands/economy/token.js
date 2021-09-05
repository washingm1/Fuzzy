const { Client, CommandInteraction,  MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');



module.exports = {
    name: "token",
    description: "Use your tokens, win a prize",
   

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

        let tokens = db.fetch(`token_${guild.id}_${user.id}`)
        const wait = require('util').promisify(setTimeout);
      
        let testChance =  Math.floor(Math.random() * 100) + 1;
      
        console.log(tokens)
      
        if (tokens < 1){
         return interaction.editReply({ content: 'You do not have any tokens!'});
                  }
      
            console.log(testChance)
      
                // 5 here is percentage of success.
                if (testChance <= 25) {
                    console.log(testChance)
                    let embed = new MessageEmbed()
                    .setTitle('Token Used')
                    .setDescription(`You used a token and got a **rob token!** ${tokens -1} token(s) remaining `)
                    .setColor("RANDOM")
                    interaction.editReply({ embeds: [embed] })
      
                 
                 db.add(`robToken_${guild.id}_${user.id}`, 1)
                       
                }
                
                if (testChance > 25 && testChance <= 40){
              
                  let embed = new MessageEmbed()
                  .setTitle('Token Used')
                  .setDescription(`You used a token and got **1000 coins!** ${tokens -1} token(s) remaining `)
                  .setColor("RANDOM")
                  interaction.editReply({ embeds: [embed]})
          
                
                  db.add(`money_${guild.id}_${user.id}`, 1000)
                     
              }
              
              if (testChance > 40 && testChance <= 70){
              
                  let embed = new MessageEmbed()
                  .setTitle('Token Used')
                  .setDescription(`You used a token and got **500 coins!** ${tokens -1} token(s) remaining `)
                  .setColor("RANDOM")
                  interaction.editReply({embeds: [embed] })
      
                  db.add(`money_${guild.id}_${user.id}`, 500)
      
              }
              
              if (testChance > 70 && testChance <= 100){
              
                  let embed = new MessageEmbed()
                  .setTitle('Token Used')
                  .setDescription(`You used a token and won **nothing**! ${tokens -1} token(s) remaining `)
                  .setColor("RANDOM")
                  interaction.editReply({ embeds: [embed]})
           
              }
      
      
            await wait(1000)
      
      
              db.subtract(`token_${guild.id}_${user.id}`, 1)


},
};
