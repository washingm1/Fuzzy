const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const Canvas = require('canvas');



module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  
  const { dailyBackground } = require("./profileset");
 
  let user = message.author;
  let amount = 0; 
  let timeout = 0 //86400000;

  let tokenAmt = 0;


  if (message.member.roles.cache.some(role => role.name === 'server booster')) {
    amount = 600
    } else
  
  if (message.member.roles.cache.some(role => role.name === 'frequent flyers')) {
    amount = 300
  
    } else
   
    amount = 200;

    if  (message.member.roles.cache.some(role => role.name === 'frequent flyers')) {
    tokenAmt = 2;
    } else tokenAmt = 1;
  
  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:no_entry_sign: You've already collected your daily reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())

  let token = db.fetch(`token_${message.guild.id}_${message.author.id}`)


  const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/Truckin.ttf', { family: 'Truckin' })  
 
  const canvas = Canvas.createCanvas(500,200);  
  const ctx = canvas.getContext('2d');

  let background = []
  
  if (db.fetch(`dailyBack_${message.guild.id}_${user.id}`) === null){
  background = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/859817351881293844/dailycard_fuzzybrain.png');
} 
else background = await Canvas.loadImage(db.fetch(`dailyBack_${message.guild.id}_${user.id}`));




 
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  
  ctx.font = "32px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = "center";
  ctx.fillText(user.username +"#" + message.author.discriminator, 252,50);

  
  ctx.font = "bold 40px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`You collected \n ${amount} credits! `, 250, 115);

  ctx.font = "17px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(`Boosts`, 450, 30);

  const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 16, 15, 65, 65);

  if (message.member.roles.cache.some(role => role.name === 'server booster')) {
    const booster = await Canvas.loadImage('https://media.discordapp.net/attachments/813130416952311808/855861517512343582/booster_logo.png');
    ctx.drawImage(booster, 420, 30, 25, 25);

    }
    if (message.member.roles.cache.some(role => role.name === 'frequent flyers')) {
      const ff = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/855886270232133662/FF_badge.png');
      ctx.drawImage(ff, 450, 32, 25, 25);
  
      }

    


  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'daily.png');



const daily = new Discord.MessageEmbed()
  .setDescription(`${message.author}, you collected your daily reward!\n Check your balance using '!profile' or '!balance'\n**Remind yourself with '!rem 24h'**`)
  .setTitle(`${message.author.username} collected their daily!`)
  .attachFiles(attachment)
  .setImage(`attachment://daily.png`)
  .setColor('#E400FA'
  
  )
 

  const addedToken = new Discord.MessageEmbed()
    .setDescription(`You've collected ${tokenAmt} tokens! Use the !token command to see your prize!`)
   .setColor('RANDOM')

  

  message.channel.send(daily);

  if (token >= 10){
    let maxToken = new Discord.MessageEmbed()
    .setDescription('Maximum amount of tokens reached, please use them to continue collecting')
    .setColor('RANDOM')
    return message.channel.send(maxToken);
  } else
  
  db.add(`token_${message.guild.id}_${message.author.id}`, tokenAmt)
  message.channel.send(addedToken);
  }
};


module.exports.help = {
  name:"daily",
  aliases: ["day"]
}