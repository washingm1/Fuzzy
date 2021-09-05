
const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const db = require("quick.db");
const { concerts } = require("f:/economybot-master/commands/arrays/concert_cities");

module.exports = {
    name: "concerts",
    description: "Choose which Harmony House shows you're going to",
   
 options: [
     {
         name: "concert",
         description: 'Concert you\'re attending',
         required: true,
         type: "STRING",
     },

 ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


     run: async (client, interaction, args) => {
        console.log(interaction);
        await interaction.deferReply({ ephemeral: true }).catch(() => {});
        const [ concert ] = args
        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user
        const member =  interaction.member || interaction.options.getMember(userlookup) ;
        for(const x of concerts){
            if (concert == `${x.cmdName}`) {
            
                if (member.roles.cache.some(role => role.name === x.roleName)) {
                    let embed = new MessageEmbed().setDescription(`Removing the ${x.roleName} role`);
                    return interaction.editReply({embeds: [embed]});
                   }
                   let embed2 = new MessageEmbed().setColor('RANDOM').setDescription(`You now have the ${x.roleName} concert role!`);
                interaction.editReply({ embeds: [embed2]});
                await guild.members.cache.get(user.id).roles.add(x.id);
                    }
                }



    },
};
