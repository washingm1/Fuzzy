const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
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
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');



const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILD_INVITES,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.DIRECT_MESSAGES],
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

/* const subFolders = fs.readdirSync('./commands/');

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
} */



   //Welcome Message

   client.on('guildMemberAdd', async member => {
    
    const guild = '646074330249429012';

    const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId('alerts')
    .setLabel('Alerts Role')
    .setStyle('PRIMARY')
      )

     const rulesChannel = `https://discord.com/channels/{646074330249429012}/{732726820893360140}`

   //member.send(`Welcome to the server! Be sure to check out #rules and ${rulesChannel}`)

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
        nickname = `${nickname.slice(0, 8)}...` 
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
  
    const wembed = new Discord.MessageEmbed()
      .setAuthor(`${member.user.username} has joined!`)
      .setColor('RANDOM')
      .setDescription(`Welcome to the server, ${member.user}!\n\n Here are a few helpful channels to get you started:\n\n<#732726820893360140>- General rules for the server, read these over!\n\n<#658074540194398238>- A guide for the server bots & channels\n\n<#646074330249429016>- The main chat channel, hop in and say hello!\n\nClick the button below to receive the Alerts role, and be notified of any Dayglow-related news!\n\n Enjoy Your Stay!`)

.setImage('attachment://welcome.png');

  channel.send({ embeds: [wembed], components: [row], files: [attachment] })

    
    const collector = channel.createMessageComponentCollector({
      time: 60000,
    });




  collector.on('collect', (ButtonInteraction) => {
    if (ButtonInteraction.user.id !== member.user.id) return console.log('Button clicker is not author');
      const id = ButtonInteraction.customId;
console.log(id)

  //Initiating Button interaction
    if (!ButtonInteraction.isButton()) return; 

//Seeing which lvl roles the user wants to go to
if (id == 'alerts'){
  let user = ButtonInteraction.user;
  member.roles.add(`740221831197360237`);
  channel.send("You now have the alerts role!").then(msg => {msg.delete({ timeout: 100000 }) }).catch('error'); 
}

  });

});



  client.on('messageCreate', message => {
    if (message.content === '!joinserver') {
      client.emit('guildMemberAdd', message.member);
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

bot.counter = 0;
bot.maxCount = 3;

client.on("messageCreate", async message => {
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

/* 
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
  } */

}

  
  )})


client.login(token.val);
