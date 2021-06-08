const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const Canvas = require('canvas');



module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  

 
  let user = message.author;
  let amount = 0
  let timeout = 0 //86400000 ;
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

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'daily.png');

const daily = new Discord.MessageEmbed()
  .setDescription(`${message.author}, you collected your daily reward! Check your balance using '!profile' or '!balance'`)
  .setTitle(`${message.author.username} collected their daily!`)
  .attachFiles(attachment)
  .setImage(`attachment://daily.png`)
  .setColor('#E400FA')
  
  

  message.channel.send(daily);

  }
};


module.exports.help = {
  name:"daily",
  aliases: ["day"]
}
