
const { Client, CommandInteraction, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { MessageSelectMenu } = require('discord.js');
const db = require("quick.db");
const ms = require('ms');


module.exports = {
    name: "remind",
    description: "Remind yourself for something",
   
 options: [
     {
         name: "reminder",
         description: 'What do you need reminding for?',
         required: true,
         type: "STRING",
     },
     {
        name: 'time',
        description: 'When do you want to be reminded? (Time followed by \`s\` for seconds, \`m\` for minutes, \`h\` for hours)',
        required: true,
        type: "STRING"
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
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const [ reminder, time ] = args
        const guild = client.guilds.cache.get("646074330249429012");
        let user = interaction.options.getUser('youruseroption') || interaction.user


        let timeuser = time;
        let reason = reminder;
        
        
        if(!timeuser) return interaction.editReply({ content: ":x: Please enter a valid time" })
        
        
        db.set(`remind_${user.id}`,Date.now() + ms(timeuser))
        const reminderSet = new MessageEmbed()
        .setTitle('Success!')
        .setDescription(`You will be reminded in \`${time}\` for *"${reminder}"*"`)
        interaction.editReply({ embeds: [reminderSet] })
        const interval = setInterval(function() {
        
        const reminderEmbed = new MessageEmbed()
            .setTitle('You are being reminded!')
            .setDescription(`You are being reminded for \`${reason}\``)
            .setFooter(`You set a reminder for ${time}`)

            if(Date.now() > db.fetch(`remind_${user.id}`)){
                db.delete(`remind_${user.id}`)
               user.send({ embeds: [reminderEmbed] })
                .catch(e => console.log(e))
                clearInterval(interval)
            }
        
        },1000)

    },
};
