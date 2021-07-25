const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require('canvas');

module.exports.run = async (bot, message, args) => {




 
  if(!message.content.startsWith('!'))return;  

  let user = message.mentions.members.first() || message.author;

  let money = await db.fetch(`money_${message.guild.id}_${user.id}`)
  if (money === null) money = 0;

  
 
  const canvas = Canvas.createCanvas(650,650);  
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/842524249058181120/stampBook2.png?width=465&height=465');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  

  if (message.member.roles.cache.some(role => role.name === 'daybro')) {
    const daybro = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830219807195187/daybro_stamp.png');
    ctx.drawImage(daybro, 5, 4, 205,205);
 
 
   }
 



   if (message.member.roles.cache.some(role => role.name === 'level 10')) {
    const lvl10 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=465&height=465');
    ctx.drawImage(lvl10, 238, 23, 169, 169);
   }

   if (message.member.roles.cache.some(role => role.name === 'level 15')) {
  
    const lvl10 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=465&height=465');
    ctx.drawImage(lvl10, 238, 23, 169, 169);

    const lvl15 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830225360060427/level_15_stamps.png?width=465&height=465');
    ctx.drawImage(lvl15, 457, 23, 169,169);
 
   }


   if (message.member.roles.cache.some(role => role.name === 'level 20')) {
 
    const lvl20 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830226609831956/level_20_stamp.png?width=465&height=465');
    ctx.drawImage(lvl20, 20, 238, 168, 168);
    const lvl10 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=465&height=465');
    ctx.drawImage(lvl10, 238, 23, 169, 169);

    const lvl15 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830225360060427/level_15_stamps.png?width=465&height=465');
    ctx.drawImage(lvl15, 457, 23, 169,169);
 
 
   }



   if (message.member.roles.cache.some(role => role.name === 'level 25')) {

    const lvl25 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830228065910794/level_25_stamp.png?width=465&height=465');
    ctx.drawImage(lvl25, 238, 238, 168, 168);
 
    const lvl20 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830226609831956/level_20_stamp.png?width=465&height=465');
    ctx.drawImage(lvl20, 20, 238, 168, 168);

    const lvl10 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=465&height=465');
    ctx.drawImage(lvl10, 238, 23, 169, 169);
    const lvl15 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830225360060427/level_15_stamps.png?width=465&height=465');
    ctx.drawImage(lvl15, 457, 23, 169,169);
   }

   if (message.member.roles.cache.some(role => role.name === 'frequent flyers')) {
    const ff = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830222026113054/ff_stamp.png');
    ctx.drawImage(ff, 457, 240, 168,168);
 
  
    const lvl25 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830228065910794/level_25_stamp.png?width=465&height=465');
    ctx.drawImage(lvl25, 238, 238, 168, 168);
 
    const lvl20 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830226609831956/level_20_stamp.png?width=465&height=465');
    ctx.drawImage(lvl20, 20, 238, 168, 168);

    const lvl10 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=465&height=465');
    ctx.drawImage(lvl10, 238, 23, 169, 169);

    const lvl15 = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830225360060427/level_15_stamps.png?width=465&height=465');
    ctx.drawImage(lvl15, 457, 23, 169,169);
   }






   if (message.member.roles.cache.some(role => role.name === 'fuzzybrain vinyl')) {
    const vinyl = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/844020212159610890/vinyl_ig.png?width=465&height=465');
    ctx.drawImage(vinyl, 238, 457, 168,168);
 
   }




   if (message.member.roles.cache.some(role => role.name === 'fat stacks')) {
    const stacks = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830228711178300/stacks_stamps.png');
    ctx.drawImage(stacks, 2, 434, 210,210);
 
   }

   if (message.member.roles.cache.some(role => role.name === 'staff')) {
    const stacks = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/841830232457740288/staff_stamp.png?width=465&height=465');
    ctx.drawImage(stacks, 457, 457, 168,168);
 
   }
 
 
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'stamps.png');

  message.channel.send(attachment);

  






  try {
    await returnsPromise()
  } catch (error) {
    console.log('That did not go well.')
  }


};

module.exports.help = {
  name:"stamps",
  aliases: ["stamp"]
}
