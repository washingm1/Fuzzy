const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require('canvas');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  

  let user = message.mentions.members.first() || message.author;

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;


  
const array = db.all().filter(i => i.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data) // This is your usual leaderboard.
const tosee = (element) => element.ID == `money_${message.guild.id}_${message.author.id}` // This is a function to help us find the position of you on the leaderboard.
const position = array.findIndex(tosee) + 1 || "N/A" // This should find the index of the first value that satisfies the function of tosee (see above) and return it


   
  console.log(array.includes('money_'));

  const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/COLLEGE.ttf', { family: 'COLLEGE' })

  const canvas = Canvas.createCanvas(500,300);  
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/840316343169318962/balance.png');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  

  ctx.font = "26px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Rank: #' + position, 274, 198);
 

 
  ctx.font = "26px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('BALANCE: ' + money, 274, 143);
  
  ctx.font = "20px College";
  ctx.textAlign - "center";
  ctx.fillStyle = '#000000';
  ctx.textAlign = "center";
  ctx.fillText(user.username +"#" + message.author.discriminator, 400,65);


  const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 12, 12, 85, 85);


  
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');

  message.channel.send(attachment);

  






  try {
    await returnsPromise()
  } catch (error) {
    console.log('That did not go well.')
  }


};

module.exports.help = {
  name:"profile",
  aliases: ["pro"]
}
