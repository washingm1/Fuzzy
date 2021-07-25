const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const Canvas = require('canvas');
module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  

  let user = message.author;
  let timeout = 604800000;
  let amount = 500;
 
  let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("#26eb6e")
    .setDescription('Come back Later...')
    .setDescription(`🚫 You've already collected your weekly reward\n\nCollect it again in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    
  db.add(`money_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())
 
/*   const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/COLLEGE.ttf', { family: 'COLLEGE' })  */

  const canvas = Canvas.createCanvas(500,200);  
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/851934313674178580/daily2.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  
  ctx.font = "27px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#000000';
  ctx.textAlign = "center";
  ctx.fillText(user.username +"#" + message.author.discriminator, 390,30);

  
  ctx.font = "bold 35px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#000000';
  ctx.fillText(`You collected \n ${amount} credits! `, 150, 115);

  ctx.font = "17px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#000000';
  ctx.fillText(`Boosts:`, 180, 14);

  const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 0, 0, 65, 65);

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'weekly.png');

const weekly = new Discord.MessageEmbed()
  .setDescription(`${message.author}, you collected your weekly reward! \n Check your balance using '!profile' or '!balance'`)
  .setTitle(`${message.author.username} collected their daily!`)
  .attachFiles(attachment)
  .setImage(`attachment://weekly.png`)
  .setColor('#E400FA')
  
  

  message.channel.send(weekly);

  }
};


module.exports.help = {
  name:"weekly",
  aliases: ["week"]
}