const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const Canvas = require('canvas');



module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  

 
  let user = message.author;
  let amount = 0
  let timeout = 86400000 ;
  if (message.member.roles.cache.some(role => role.name === 'frequent flyers')) {
    amount = 300
    } else amount = 200;
    
    
  
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

  const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/COLLEGE.ttf', { family: 'COLLEGE' })

  const canvas = Canvas.createCanvas(500,200);  
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/492703825287839754/821430424504893450/daily.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  

  
  ctx.font = "28px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`You've collected ${amount} \n credits! `, 10, 135);
  
  ctx.font = "16px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#000000';
  ctx.textAlign = "center";
  ctx.fillText(user.username +"#" + message.author.discriminator, 124,30);




  const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 9, 23, 55, 55);

  
 
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'daily.png');

  message.channel.send(attachment);

  }
};


module.exports.help = {
  name:"daily",
  aliases: ["day"]
}