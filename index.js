const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const prefix="!";
const db = require('quick.db');
const Canvacord = require('canvacord');
const client = new Discord.Client(); 
const { Slash } = require('discord-slash-commands');
const { profile, time } = require("console");
const canvacord = require("canvacord");
const slash = new Slash(bot);
const moment = require ('moment')
const Canvas = require('canvas');

require('discord-buttons')(bot)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}` || `./util/${f}` );
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});


})


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`In Development`);
  bot.user.setStatus('dnd');  

  const Discord = require('discord.js');
  const client = new Discord.Client();

  

 slash.command({
          guildOnly: true,
          guildID: "646074330249429012",
          data: {
              name: "ping",
              description: "Ping pong?",
              type: 4,
              content: `Pong! \`${bot.ws.ping}ms\``,
              
          }
      })
 
      let embed = new Discord.MessageEmbed()
      .setTitle("Fuzzybrain Bot Help [Prefix !]")
      .addField("Economy Commands", "**Work:** Get a random amount of credits for working! Cooldown every 30 minutes \n **rob:** Steal a random amount of credits from another user! \n **pay:** Give another user a specified amount of credits! \n\n **balance:** Check the amount of credits and tokens you have \n\n **top:** view the users with the most points in the server \n\n **profile:** view your personal stats \n\n **withdraw:** Take out a specified amount of credits from the bank \n\n **deposit:** Deposit a specified amount of credits in the bank \n\n **daily:** Collect credits on a daily basis! \n\n **buy:** Buy a role from the shop \n\n")
      .setColor("RANDOM")

      let embed2 = new Discord.MessageEmbed()
      .setTitle("Fuzzybrain Bot Help [Prefix !]")
      .addField("Info Commands", "**Invites:** Check how many people you've invited to the server! \n\n **pronoun:** Add or remove any pronoun roles!\n\n **Remind** Set a specified amount of time to remind you of something! \n\n **Userinfo:** Check your discord information! \n\n ")
      .setColor("RANDOM")

      slash.command({
        ephemeral: true,
        guildOnly: true,
        guildID: "646074330249429012",
        data: {
            name: "help",
            description: "Get help from the Bot",
            type: 4,
            content: 'here is your embed',
            embeds: [embed2, embed]
           
        
            
        }
    })


    bot.on('guildMemberAdd', async member => {
      const channel = member.guild.channels.cache.find(ch => ch.name === 'test');
      if (!channel) return;
     const joinDate = moment(member.joinedAt).format('MMMM Do YYYY');

      const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/Truckin.ttf', { family: 'Truckin' }) 

      const canvas = Canvas.createCanvas(500, 200);
      const context = canvas.getContext('2d');
    
      const background = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/857441284570480650/welcomecard.png');
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
    
      context.strokeStyle = '#74037b';
      context.strokeRect(0, 0, canvas.width, canvas.height);
    
 
      context.font = '35px Truckin';
      context.fillStyle = '#000000';
      context.fillText(`${member.user.username}#${member.user.discriminator}`, 125, 140);

      context.font = '20px Truckin';
      context.fillStyle = '#000000';
      context.fillText(`Member #${member.guild.memberCount}`, 180,82);
    
      context.font = '18px Truckin';
      context.fillStyle = '#000000';
      context.fillText(`${joinDate}`, 200, 192);
    
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
      context.drawImage(avatar, 0, 0, 92, 92);
    
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');
    
      let wembed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username} has joined!`)
        .setColor('RANDOM')
        .setDescription(`Welcome to the server, ${member.user}!\n\n Here are a few helpful channels to get you started:\n\n<#732726820893360140>- General rules for the server, read these over!\n\n<#658074540194398238>- A guide for the server bots & channels\n\n<#646074330249429016>- The main chat channel, hop in and say hello!\n\n Enjoy Your Stay!`)
        .attachFiles(attachment)
.setImage('attachment://welcome.png');
    channel.send(wembed);
    channel.send(`${member.user} has joined, Give them a big welcome!`)
    });
    
    bot.on('message', message => {
      if (message.content === '!join') {
        bot.emit('guildMemberAdd', message.member);
      }
    });


    bot.counter = 0;
bot.maxCount = 3;




  bot.on("message", async message => {
    if(message.author.bot) return;

 
  
if(message.channel.id === '845488614753304596'){
    const { content } = message
    const eachLine = content.split('\n')
    for (const line of eachLine){
      if (line.includes(' ')){
          const split = line.split(' ')
          const emoji = split[0].trim()
          message.react(emoji)
      }
    }
  };


//SCAVENGER HUNT CODE

let guildID = '646074330249429012'

  if(message.channel.type === "dm"){
        if(message.content === "2080"){
          let embed = new Discord.MessageEmbed()
          .setTitle('Good Job!')
          .setColor('RANDOM')
          .setDescription('You cracked the first clue! To advance, you must unscramble this phrase:\n\nqaesonnstwarneudesatcripiio')
          .setFooter('HINT: There are three words, the first letter in the scramble, is the first letter of the first word')
          message.author.send(embed)

        //QnA description will have a phrase to send 'Send bot 'Unlock Fuzzy'
        }
      
const channel = bot.channels.cache.get('856587120789028885');
const channel2 = bot.channels.cache.get('739954713818300456');

          if (message.content === 'Unlock Channel') {
        
             channel.updateOverwrite(message.author,{
                 VIEW_CHANNEL: true
             })    
           
             let scavWelcome = new Discord.MessageEmbed()
             .setTitle('Almost There!')
             .setDescription(`Welcome ${message.author}! \n\nFor your final step, name this song\n\n **Send the title to ${bot.user}, please capitalize the first letter of the song name!**`)
             .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
             .setColor('RANDOM')
          channel.send(scavWelcome);
          channel.send(`${message.author}`);
          }

          if (message.content === 'December'){
            
            if (bot.counter === bot.maxCount){
              bot.counter = 0
              return message.author.send('**Good Try!**\n\n Maximum winners reached, almost had it!')
            }
            else bot.counter++;
              let scavFinish = new Discord.MessageEmbed()
              .setTitle('Congratulations!')
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`**Congrats ${message.author}! You have completed the Scavenger hunt, you placed number ${bot.counter}!**`)
              .addField('Rewards', `For your reward, you now have a color customizeable role, and credits!`)
              .addField('1st Place', '15,000 Credits')
              .addField('2nd Place', '10,000 Credits')
              .addField('3rd Place', '7,500 Credits')
              .setColor('RANDOM')
              message.author.send(scavFinish)
             channel2.send(`${message.author} placed #${bot.counter}\n\n Author ID: ${message.author.id}`)
          }

      
    } ;

//END SCAVENGER HUNT CODE


    {
      {
       xp(message)
       if(message.author.bot) return;
       var user = message.mentions.users.first() || message.author;
      var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
      var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
      var xpNeeded = level * 500 + 500 

   }
  
   
   function xp(message){
     if(message.author.bot) return
     const randomNumber = Math.floor(Math.random() * 10) + 15;
     const randomNumber2 = Math.floor(Math.random() * 5);
     db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
     db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)

     db.add(`money_${message.guild.id}_${message.author.id}`, randomNumber2)

     var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
     var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
     var xpNeeded = level * 500;
     if(xpNeeded < xp){
       var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
       db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
       message.channel.send(`${message.author}, you are now level ${newLevel}!`)
     }
   } 
 }


    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = bot.commands.get(bot.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefix)) return;
       
  try {
    commandfile.run(bot, message, args);
  
  } catch (e) {
  }}

  
  )})









bot.login("");

