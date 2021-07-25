const Discord = require('discord.js')
const db = require('quick.db')
const Canvas = require('canvas');
const { join } = require("path");
const { monitorEventLoopDelay } = require('perf_hooks');
const { color } = require('canvas-constructor');



module.exports.run = async (client, message, args) => {
   
  if(!message.content.startsWith('!'))return;  

  let level = db.all().filter(data => data.ID.startsWith(`xptotal_646074330249429012_`)).sort((a, b) => b.data - a.data);
 level.length = 10;



let numList = "";

let usernames = "";

let levels = "";

let userBal = "";

let xpUser = ""; 

const canvas = Canvas.createCanvas(600,800);  
const ctx = canvas.getContext('2d');
const background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/861428729283608586/ldbd_background.png?width=352&height=469');

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


  const { registerFont, createCanvas } = require('canvas')
  registerFont('./font/Truckin.ttf', { family: 'Truckin' }) 




/*   const xps = [];
  const userIDS = [];
  const currentXPs = [];
  const totalScore = [];

  for (let i = 0; i < level.length; i++) {
     const ids = await client.users.fetch(`${level[i].ID.replace('guild_646074330249429012_level_', '')}`).catch(console.error);
     const currentXP = db.get(`guild_${message.guild.id}_xp_${ids.id}`);
     const neededXP = level[i].data * 850;
     const xpScore = (level[i].data * neededXP + currentXP);
  
     xps.push(xpScore);
     userIDS.push(ids);
     currentXPs.push(currentXPs);
     totalScore.push(xpScore);
  }
  
  const sorted = xps.sort((a, b) => b - a);
  console.log(sorted);
console.log(userIDS);

 */

  for (var i in level) {
  let user = await client.users.fetch(`${level[i].ID.replace('xptotal_646074330249429012_', '')}`).catch(console.error);

 
  const memberFetch = await message.guild.members.cache.get(user.id)

  var UserLevel = db.fetch(`guild_${message.guild.id}_level_${user.id}`)

  var xpNeeded = UserLevel * 850;

  var xp = db.get(`guild_${message.guild.id}_xp_${user.id}`)

 userBal = db.fetch(`money_646074330249429012_${user.id}`)

 xpUser = `${db.get(`guild_${message.guild.id}_xp_${user.id}`)} / ${xpNeeded}`


  
    numList = `${level.indexOf(level[i])+1}`

    colorUser = user.username

    usernames =  `${memberFetch.displayName}` 


    levels = `Level ${UserLevel}`

    let size = 60
    let padding = 10



    
    //Headers

    ctx.font = "40px Truckin";
    ctx.textAlign - "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText('Top 10 Leaderboard', 120, 50)

    ctx.font = "34px Truckin";
    ctx.textAlign - "center";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(numList, 15, 130 + i * (size + padding));

    //Data

    if (usernames.length > 16){

      usernames = `${usernames.slice(0, 12)}...`
    }
    ctx.font="34px Truckin";
    ctx.textAlign = "left";
    ctx.fillStyle =  memberFetch.displayHexColor;
    ctx.fillText(`${usernames}`,130, 110 + i * (size + padding));
    console.log(usernames.length)

    ctx.font = "22px Truckin";
    ctx.textAlign = "left";
    ctx.fillStyle =  "#FFFFFF";
    ctx.fillText(levels, 140, 135 + i * (size + padding));
  
     ctx.font = "20px Truckin";
    ctx.textAlign = "left";
    ctx.fillStyle =  "#FFFFFF";
    ctx.fillText(`Total: ${level[i].data}`, 260, 135 + i * (size + padding));
   

    ctx.font = "22px Truckin";
    ctx.textAlign = "left";
    ctx.fillStyle =  "#FFFFFF";
    ctx.fillText(`${userBal} Credits`, 430, 135 + i * (size + padding));
  

/*     //XP BAR
ctx.beginPath();
ctx.lineWidth = 2;
ctx.strokeStyle = "#FFFFFF";
ctx.globalAlpha = 0.2;
ctx.fillStyle = "#000000";
ctx.fillRect(260,124 + i * (size + padding), 70, 10);
ctx.fill();
ctx.globalAlpha = 1;
ctx.strokeRect(260, 124 + i * (size + padding),70,10);
ctx.stroke();

ctx.fillStyle = "#4287f5";
ctx.globalAlpha = 1;
ctx.fillRect(262, 126 + i * (size + padding),((100 / (xpNeeded / xp)) * 0.7)  ,7);
ctx.fill();
ctx.globalAlpha = 1;
 */

  
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 55, 80 + i * (size + padding), size, size); 
  
  }
  

  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');

  message.channel.send(attachment);

  




}
module.exports.help = {
  name:"top",
  aliases: [""]
}
