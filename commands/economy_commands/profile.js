const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require('canvas');
const { join } = require("path");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('!'))return;  
  const { profile } = require("./profileset");

  let user = message.mentions.members.first() || message.author;


  let tokens = db.fetch(`token_${message.guild.id}_${message.author.id}`)
    if (tokens === null) tokens = 0;

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;

   var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
   var xpNeeded = level * 850;
       var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)

       let items = await db.fetch(message.author.id, { items: []});


const array = db.all().filter(i => i.ID.startsWith(`xptotal_646074330249429012_`)).sort((a, b) => b.data - a.data) // This is your usual leaderboard.
const tosee = (element) => element.ID == `xptotal_646074330249429012_${message.author.id}` // This is a function to help us find the position of you on the leaderboard.
const position = array.findIndex(tosee) + 1 || "N/A" // This should find the index of the first value that satisfies the function of tosee (see above) and return it

   


  
  const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/Truckin.ttf', { family: 'Truckin' }) 

  const canvas = Canvas.createCanvas(400,450);  
  const ctx = canvas.getContext('2d');

 let background = []
  
  if (db.fetch(`profile_${message.guild.id}_${user.id}`) === null){
  background = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/859788998976208906/profilecard2.png');
} 
else background = await Canvas.loadImage(db.fetch(`profile_${message.guild.id}_${user.id}`));

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
let profiletheme = db.fetch(`profile_${message.guild.id}_${user.id}`)
    if (profiletheme === null) message.channel.send('You haven\'t set a background yet! Choose from [fuzzybrain, harmony, fullhouse, boat]');

   ctx.font = "36px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Rank #' + position, 32, 315);
  

  const memberFetch = await message.guild.members.cache.get(message.author.id);

nickname = memberFetch.displayName;
//USER DATA

  ctx.font = "32px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('BALANCE: \n' + money + ' Credits', 32, 154);
  
  ctx.font = "20px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`(${bank} credits in bank)`, 40, 210);
  

  ctx.font = "36px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Level: ' + level, 32, 254);

  ctx.font = "28px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = '#ffffff';
  ctx.fillText(': ' + tokens, 70, 365);


//USERNAME
if (nickname.length > 16){
console.log(nickname.length)
  nickname = `${nickname.slice(0, 12)}...`
}
  ctx.font = "Bold 25px Truckin";
  ctx.textAlign - "center";
  ctx.fillStyle = "#FFFFFF"; //(message.guild.member(user).displayHexColor);
  ctx.textAlign = "center";
  ctx.fillText(nickname +"#" + message.author.discriminator, 230,45);


//XP BAR
ctx.beginPath();
ctx.lineWidth = 4;
ctx.strokeStyle = "#FFFFFF";
ctx.globalAlpha = 0.2;
ctx.fillStyle = "#000000";
ctx.fillRect(35,390, 200, 30);
ctx.fill();
ctx.globalAlpha = 1;
ctx.strokeRect(35, 390, 200, 30);
ctx.stroke();

ctx.fillStyle = "#4287f5";
ctx.globalAlpha = 1;
ctx.fillRect(37, 392,((100 / (xpNeeded / xp)) * 2)  ,26);
ctx.fill();
ctx.globalAlpha = 1;

//AVATAR
const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
ctx.drawImage(avatar, 18, 18, 80, 80);

//XP BAR TEXT
ctx.font = "20px Truckin";
ctx.textAlign - "center";
ctx.fillStyle = '#ffffff';
ctx.fillText(`${xp}/${xpNeeded} xp`, 135, 412);


  const tokenLogo = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/856923632583704646/tokenLogo.png');
  ctx.drawImage(tokenLogo, 25, 335, 40, 40);




  if (message.member.roles.cache.some(role => role.name === 'frequent flyers')) {
    const ff = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/855886270232133662/FF_badge.png');
    ctx.drawImage(ff, 160, 60, 30, 30);
    }

    if (message.member.roles.cache.some(role => role.name === 'server booster')) {
      const booster = await Canvas.loadImage('https://media.discordapp.net/attachments/813130416952311808/855861517512343582/booster_logo.png');
      ctx.drawImage(booster, 120, 60, 30, 30);
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

