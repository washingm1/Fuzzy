const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require('canvas');

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  
  const { profile } = require("./profileset");

  let user = message.mentions.members.first() || message.author;

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;
  {
    xp(message)
    if(message.author.bot) return;
  
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


const array = db.all().filter(i => i.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data) // This is your usual leaderboard.
const tosee = (element) => element.ID == `money_${message.guild.id}_${message.author.id}` // This is a function to help us find the position of you on the leaderboard.
const position = array.findIndex(tosee) + 1 || "N/A" // This should find the index of the first value that satisfies the function of tosee (see above) and return it

   
  console.log(array.includes('money_'));

  const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/College2.otf', { family: 'College2' }) 

  const canvas = Canvas.createCanvas(400,450);  
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage(db.fetch(`profile_${message.guild.id}_${user.id}`));
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  

   ctx.font = "36px College2";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Rank #' + position, 32, 320);
  

  ctx.font = "30px College2";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${currentxp}/${xpNeeded} xp`, 50, 425);




  ctx.font = "36px College2";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('BALANCE: \n' + money + ' Credits', 32, 154);
  
  ctx.font = "36px College2";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Level: ' + level, 32, 254);


  ctx.font = "Bold 30px College2";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = "center";
  ctx.fillText(user.username +"#" + message.author.discriminator, 230,45);



  const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
  ctx.drawImage(avatar, 18, 18, 80, 80);

  if (message.member.roles.cache.some(role => role.name === 'frequent flyers')) {
    const ff = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/854069619978272809/FF_badge.png');
    ctx.drawImage(ff, 344, 18, 32, 32);
    }

  
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
