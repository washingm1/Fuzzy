const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js');
const ms = require("parse-ms");
const Canvas = require('canvas');
const { MessageEmbed } = require('discord.js');
const toMilliseconds = require('to-milliseconds');
const now = new Date();
module.exports = {
    name: "daily",
    description: "Earn credits every 24 hours",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
  //console.log(interaction)
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        let user = interaction.options.getUser('youruseroption') || interaction.user
        const guild = client.guilds.cache.get("646074330249429012");
    

        let cmdChannel = interaction.guild.channels.cache.get("733043770454704189")
        let returnEmbed = new MessageEmbed()
        .setTitle('Oops!')
        .setDescription(`Please use ${cmdChannel} for any bot commands`)

        if (interaction.channel !== cmdChannel) return interaction.followUp({ embeds: [returnEmbed] });
        
         let amount = 0; 
         let timeout = 86400000;
       
         let tokenAmt = 0;
       
       
         if (interaction.member.roles.cache.has('734443360173162591')) {
           amount = 600
           } else
         
         if (interaction.member.roles.cache.has('733062488358256750')) {
           amount = 300
         
           } else
          
           amount = 200;
       
           if  (interaction.member.roles.cache.has('733062488358256750')) {
           tokenAmt = 2;
           } else tokenAmt = 1;
         
         let daily = await db.fetch(`daily_${guild.id}_${user.id}`);
       
         if (daily !== null && timeout - (Date.now() - daily) > 0) {
           let time = ms(timeout - (Date.now() - daily));

           const timeInMs = toMilliseconds.convert(time)
   
           const totalTime = now.valueOf() + timeInMs;
          var printTime = totalTime.toString().slice(0,10)

         
           const timeEmbed = new MessageEmbed()
           .setColor("#FFFFFF")
           .setDescription(`:no_entry_sign: You've already collected your daily reward\n\nCollect it again <t:${printTime}:R> `);
           interaction.editReply({ embeds: [timeEmbed] } )
         } else {
           
         db.add(`money_${guild.id}_${user.id}`, amount)
         db.set(`daily_${guild.id}_${user.id}`, Date.now())
         db.add(`dailyUse_${guild.id}_${user.id}`, 1)

         let token = db.fetch(`token_${guild.id}_${user.id}`)
       
     let dailyUses = db.fetch(`dailyUse_${guild.id}_${user.id}`)

  if(dailyUses === 100){
    interaction.followUp({ content: `You have used the daily command 100 times and have earned the \`100 Daily Uses\` Badge!` })
  }

        const { registerFont, createCanvas } = require('canvas')
        registerFont('./font/Neon.ttf', { family: 'Neon' }) 
        
         const canvas = Canvas.createCanvas(500,200);  
         const ctx = canvas.getContext('2d');
       
         let background = []
         
         background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/895077078012149780/newDailyCard.png');
       

       
       
       
       
        
         ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
         
         
         ctx.font = "32px Neon";
         ctx.textAlign - "center";
         ctx.fillStyle = '#FFFFFF';
         ctx.textAlign = "center";
         ctx.fillText(user.username +"#" + user.discriminator, 252,50);
       
         
         ctx.font = "bold 40px Neon";
         ctx.textAlign - "center";
         ctx.fillStyle = '#FFFFFF';
         ctx.fillText(`You collected \n ${amount} credits! `, 250, 115);
       
/*          ctx.font = "17px Neon";
         ctx.textAlign - "center";
         ctx.fillStyle = '#FFFFFF';
         ctx.fillText(`Boosts`, 450, 30);
        */
         const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
         ctx.drawImage(avatar, 10, 8, 80, 80);
       
/*          if (interaction.member.roles.cache.has('734443360173162591')) {
           const booster = await Canvas.loadImage('https://media.discordapp.net/attachments/813130416952311808/855861517512343582/booster_logo.png');
           ctx.drawImage(booster, 420, 30, 25, 25);
       
           }
           if (interaction.member.roles.cache.has('733062488358256750')) {
             const ff = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/855886270232133662/FF_badge.png');
             ctx.drawImage(ff, 450, 32, 25, 25);
         
             }
       
            */
       
       
         const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'daily.png');
       
       
       
       const daily = new MessageEmbed()
         .setDescription(`${user}, you collected your daily reward!\n Check your balance using \`/points\` or \`/balance\`\n\n**Remind yourself by clicking the button below!**`)
         .setTitle(`${user.username} collected their daily!`)
      // .attachFiles({ files: [attachment]} )
         .setImage(`attachment://daily.png`) 
         .setColor('#E400FA')
         .setAuthor(`${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
         

         let reminder = new MessageActionRow()
         .addComponents(
             new MessageButton()
             .setLabel('Set Reminder')
             .setStyle('PRIMARY')
             .setCustomId('remind')
             .setEmoji("⏰"),
         )


         interaction.editReply({embeds: [daily], files: [attachment], components: [reminder] })
       


         const DailyCollector = interaction.channel.createMessageComponentCollector({
          time: 90000,
        });
    
        DailyCollector.on('collect', (ButtonInteraction) => {
          if (ButtonInteraction.user.id !== interaction.user.id) return;
          console.log(ButtonInteraction.user.id)
          console.log(interaction.user.id)
                const id = ButtonInteraction.customId;
          console.log(id)


          if (id === 'remind') {
            ButtonInteraction.deferUpdate()
            db.set(`remind_${user.id}`,Date.now() + ms('24h'))
            
            const reminderSet = new MessageEmbed()
            .setTitle('Success!')
            .setDescription(`${ButtonInteraction.user.username}, You will be reminded in \`24 Hours\` for your Daily Credits!`)
            interaction.followUp({  embeds: [reminderSet], files: [], components: [] })

                    
            const reminderEmbed = new MessageEmbed()
                .setTitle('You are being reminded!')
                .setDescription(`You are being reminded for your Daily commands`)
                .setFooter(`You set a reminder for \`24h\``)
                .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                .setColor('RANDOM')
    
                if(Date.now() > db.fetch(`remind_${user.id}`)){
                    db.delete(`remind_${user.id}`)
                   ButtonInteraction.user.send({ embeds: [reminderEmbed] })
                    .catch(e => console.log(e))
                    clearInterval(interval)
                }
          }

    
            
            })
        
//tokens
if (token >= 10){
  const maxToken = new MessageEmbed()
  .setDescription('Maximum amount of tokens reached, please use them to continue collecting')
  .setColor('RANDOM')
  return interaction.channel.send({embeds: [maxToken] });
} else {
 const addedToken = new MessageEmbed()
 .setDescription(`You've collected ${tokenAmt} tokens! Use the \`/token\` command to see your prize!`)
.setColor('RANDOM')
interaction.channel.send({ embeds: [addedToken] });
}
db.add(`token_${guild.id}_${user.id}`, tokenAmt)
const wait = require('util').promisify(setTimeout);

await wait(1000)

         }
              
     
},
};
