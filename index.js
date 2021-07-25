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
const ms = require("parse-ms");
const guildID = '646074330249429012'
const { MessageButton, MessageActionRow } = require('discord-buttons');

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
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});


})
console.log('ECON COMMANDS \n\n\n')
fs.readdir("./commands/economy_commands", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/economy_commands/${f}`);
    console.log(`${f} Economy Command loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});


})

//MISC COMMANDS
console.log('MISC COMMANDS \n\n\n')

fs.readdir("./commands/misc", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/misc/${f}`);
    console.log(`${f} Misc loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});


})

//MOD COMMANDS

fs.readdir("./commands/mod_commands", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/mod_commands/${f}`);
    console.log(`${f} Moderation loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});


})

//UTILITY COMMANDS

fs.readdir("./commands/util", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/util/${f}`);
    console.log(`${f} Utility loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});


})







//On Events


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
 


    //Welcome Message

    bot.on('guildMemberAdd', async member => {
    
      let alertRole = new MessageButton()
      .setStyle('green')
      .setLabel('Get the Alerts Role')
      .setID('alert')

      let serverGuide = new MessageButton()
      .setStyle('blurple')
      .setLabel('Server Guide')
      .setID('guide')

      let rules = new MessageButton()
      .setStyle('blurple')
      .setLabel('Server Rules')
      .setID('rules')
  
    let Role = new MessageActionRow()
      .addComponent(alertRole)

     

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
      context.textAlign  = "center";
      context.fillText(`${member.user.username}#${member.user.discriminator}`, 250, 140);

      context.font = '20px Truckin';
      context.fillStyle = '#000000';
      context.textAlign  = "center";
      context.fillText(`Member #${member.guild.memberCount}`, 250,82);
    
      context.font = '18px Truckin';
      context.fillStyle = '#000000';
      context.textAlign  = "center";
      context.fillText(`${joinDate}`, 250, 192);
    
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }));
      context.drawImage(avatar, 0, 0, 92, 92);
    
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome.png');
    
      let wembed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.username} has joined!`)
        .setColor('RANDOM')
        .setDescription(`Welcome to the server, ${member.user}!\n\n Here are a few helpful channels to get you started:\n\n<#732726820893360140>- General rules for the server, read these over!\n\n<#658074540194398238>- A guide for the server bots & channels\n\n<#646074330249429016>- The main chat channel, hop in and say hello!\n\nClick the button below to receive the Alerts role, and be notified of any Dayglow-related news!\n\n Enjoy Your Stay!`)
        .attachFiles(attachment)
.setImage('attachment://welcome.png');

    channel.send({embed: wembed, component: Role })
    channel.send(`${member.user} has joined, Give them a big welcome!`)

    bot.on('clickButton', async (button) => {
      button.reply.defer()
    if (button.id == 'alert'){
      if (button.clicker.user.id !== member.user.id) return;

      await button.guild.members.cache.get(member.user.id).roles.add('740221831197360237');
        channel.send("You now have the alerts role!").then(msg => {msg.delete({ timeout: 5000 }) }).catch('error'); 
    }

    
  });
  

    });
    





    bot.on('message', message => {
      if (message.content === '!join') {
        bot.emit('guildMemberAdd', message.member);
      }
    });




    bot.counter = 0;
bot.maxCount = 3;



bot.on("message", async message => {


  if (message.channel.type === 'dm'){
   
  }

    if(message.author.bot) return;

//REMEMBER TO REMOVE WHEN UPLOADING TO HOST//To restrict local version to test channel

if (message.channel.id !== '732757852615344139') return;
  

    //POLLS
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






//XP function
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

     let author = db.fetch(`xpCool_${message.guild.id}_${message.author.id}`)

     let timeout = 5000;
     
     if (author !== null && timeout - (Date.now() - author) > 0) {
 
      return;
    }  db.set(`xpCool_${message.guild.id}_${message.author.id}`, Date.now())

     db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
     db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
     db.add(`money_${message.guild.id}_${message.author.id}`, randomNumber2)
     db.add(`xptotal_${message.guild.id}_${message.author.id}`, randomNumber)

     var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
     var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
     var xpNeeded = level * 850;
     if(xp > xpNeeded){
     db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
       db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
       message.channel.send(`${message.author} Congrats! you are now level **${level + 1}**!`)
  
     }
     console.log(level)
     
     if (level === 50){
       message.guild.members.cache.get(message.author.id).roles.add('733062488358256750');
      
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
