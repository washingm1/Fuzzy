const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');



module.exports = {
    name: "pronoun",
    description: "Choose your pronouns",
   
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
  await interaction.deferReply({ ephemeral: true });

  const row = new MessageActionRow()
  .addComponents(
    new MessageSelectMenu()
      .setCustomId('select')
      .setPlaceholder('Nothing selected')

      .addOptions([
        {
          label: 'Select me',
          description: 'This is a description',
          value: 'first_option',
        },
        {
          label: 'You can select me too',
          description: 'This is also a description',
          value: 'second_option',
        },
        {
          label: 'I am also an option',
          description: 'This is a description as well',
          value: 'third_option'
        },
      ]),
  );

 await interaction.editReply({ content: 'Choose', components: [row] })


 const collector = interaction.channel.createMessageComponentCollector({
  time: 60000,
});


let currentPage = 0;


collector.on('collect', (ButtonInteraction) => {
if (ButtonInteraction.user.id !== interaction.user.id) return console.log('Button clicker is not author');
const id = ButtonInteraction.customId;
   interaction.deferReply();

console.log(interaction)

       interaction.reply({ content: `You chose ${interaction.values[0]}`, components: [row] });
    
});

},
}