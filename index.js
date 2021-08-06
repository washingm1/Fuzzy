const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const { Client, Collection } = require("discord.js");
const bot = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const prefix="!";
const db = require('quick.db');
module.exports = bot;
const { token } = require("../economybot-master/token");
const { profile, time } = require("console");
const moment = require ('moment')
const Canvas = require('canvas');
const ms = require("parse-ms");
const guildID = '646074330249429012'
const { MessageActionRow, MessageButton } = require('discord.js');



const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./botconfig.json");

// Initializing the project
require("./handler")(client);


bot.aliases = new Collection();


//Command handler

const subFolders = fs.readdirSync('./commands/');

for (const folder of subFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(f => f.split(".").pop() === "js");
    let jsfile = commandFiles.filter(f => f.split(".").pop() === "js");
    jsfile.forEach((f, i) => {
      let props = require(`./commands/${folder}/${f}`);
      console.log(`${f} command is online!`);
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => { 
        bot.aliases.set(alias, props.help.name);
    
    });
    });
}



   //Welcome Message

   bot.on('guildMemberAdd', async member => {
    
    const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId('alerts')
    .setLabel('Alerts Role')
    .setStyle('blurple')
      )
 

   member.send('Welcome to the server! Be sure to check out #rules and #server-guide')

    const channel = member.guild.channels.cache.find(ch => ch.name === 'test-local-bot-1');
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
  

    let nickname = `${member.user.username}`

    let discrim = `${member.user.discriminator}`

    if (nickname.length > 6){
        nickname = `${nickname.slice(0, 8)}... #${discrim}` 
      }
    context.font = '35px Truckin';
    context.fillStyle = '#000000';
    context.textAlign  = "center";
    context.fillText(`${nickname} #${discrim}`, 250, 140);

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
      .attachFiles({files: [attachment]})
.setImage('attachment://welcome.png');

  channel.send({embed: [wembed], components: [row]})
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

  bot.on('messageCreate', message => {
    if (message.content === '!join') {
      bot.emit('guildMemberAdd', message.member);
    }
  });



client.on("ready", async () => {

  const guild = client.guilds.cache.get("646074330249429012");
  client.user.setActivity(` ${guild.memberCount} users`, {
    'type': "WATCHING"
  });
});

//On Events


bot.on("ready", async () => {

  const guild = bot.guilds.cache.get("646074330249429012");
  console.log(`${bot.user.username} is now online in Dayglow!`);



  client.guilds.cache.get('646074330249429012')?.commands.set([])
  client.api.applications(bot.user.id).guilds('646074330249429012').commands.set([])


 /*  bot.api.applications(bot.user.id).guilds('646074330249429012').command.post({data: {
    name: 'balance',
    description: 'Balance Slash Command'
  }}) */
 

bot.counter = 0;
bot.maxCount = 3;



bot.on("messageCreate", async message => {


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
     var xpNeeded = level * 850 + 500;
     if(xp > xpNeeded){
     db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
       db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
       message.channel.send(`${message.author} Congrats! you are now level **${level + 1}**!`)
  
     }
   
     
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

    if (client.commands.has(cmd)) {
      commandfile = client.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = client.commands.get(bot.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefix)) return;
       
  try {
    commandfile.run(bot, message, args);
  
  } catch (e) {
  }}

  
  )})


client.login(token.val);
