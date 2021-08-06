const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');

const { lvl10roles } = require("f:/economybot-master/commands/arrays/roles_array");


module.exports = {
    name: "shop",
    description: "In Progress shop command",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    
    run: async (client, interaction, args) => {
    
      await interaction.deferReply({ ephemeral: true }).catch(() => {});

        let user = interaction.options.getUser('youruseroption') || interaction.user
        const guild = client.guilds.cache.get("646074330249429012");

        let shopHome = new MessageEmbed()
        .setTitle('Dayglow Role Shop')
        .setDescription('**Welcome to the Dayglow Role Shop!**\n\n To navigate around, please choose the appropriate button to take you to a shop section.')
        .setColor('#CB33FF')
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setImage('https://media.discordapp.net/attachments/509485130847354901/850917680227024943/roleshop.png')
  
  
      var embeds = [ ]
     
        for(const y of lvl10roles)embeds.push(new MessageEmbed()
        // let i = 0; i< 10; i++
         .setColor(y.color)
         .setTitle(`${y.role}`)
         .addField('Available At:', 'Level 20')
         .addField('Cost', '10000 Credits')
         .addField('Hex Code', `${y.color}`)
         .addField('Role Preview', `${guild.roles.cache.get(`${y.roleid}`)}`)
         .setFooter('NOTE: Selling a role only gives you 75% of your credits back')
         )

         console.log([embeds])
         
        const row = new MessageActionRow() 
        .addComponents(
          new MessageButton()
          .setCustomId('prev')
          .setLabel('Back')
          .setStyle('PRIMARY')
    ,
    
        new MessageButton()
        .setCustomId('home')
        .setLabel('Home')
         .setStyle('SECONDARY')
,
          new MessageButton()
            .setCustomId('next')
            .setLabel('Next')
            .setStyle('PRIMARY')
  
            )

  await interaction.editReply({embeds: [shopHome], components: [row] });

const wait = require('util').promisify(setTimeout);


let currentPage = 0;



const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 20000 });
   collector.on('collect', b => {
        
        


    client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;
      await interaction.deferUpdate().catch(error => {
        console.log("Oh no! Something is off. " + error.message);
      });


      if(interaction.customId == "next"){
        if (currentPage < embeds.length - 1) {
            currentPage++;
      
        await wait(100);
        await interaction.editReply({ embeds: [embeds[currentPage]], components: [row]}).catch(error => {
          console.log("Oh no! Something is off. " + error.message);
        });
        } else {
            currentPage = 0
            await wait(100)
        await interaction.editReply({ content: 'This would be the home page'}).catch(error => {
          console.log("Oh no! Something is off. " + error.message);
        });
        } 
      } 
      
      if (interaction.custmId == 'home'){
        await wait(100)
        await interaction.editReply({ content: 'This would be the home page'}).catch(error => {
          console.log("Oh no! Something is off. " + error.message);
        });
      }
    });
  });
    collector.on('collect', i => console.log(`Collected ${i.customId}`));
    collector.on('end', collected => console.log(`Collected ${collected.size} items`));

	/* 	await interaction.deferUpdate();
		await wait(4000);
		await interaction.editReply({ content: 'You chose the first menu option', components: [] }); */
	
    
    },
};
