const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require('canvas');
//const { badges } = require("../arrays/badges");

module.exports.run = async (bot, message, args) => {

/*   if(!message.content.startsWith('!'))return;  




  const canvas = Canvas.createCanvas(600,800);  
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/861428729283608586/ldbd_background.png?width=352&height=469');
  
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  

  if (badges.length > 0) {
    //Initial y value
    const y_val = 306;
    //Num. of badges in each column
    const maxbadges = Math.max(3, Math.ceil(Math.sqrt(badges.length)));
    for (let i = 0; i < Math.min(badges.length, maxbadges ** 2); i++) {
        //Calculate x value depending on i #
        const x_val = (480 / maxbadges) * (i % maxbadges) + 482;
        //Calculate x shift
        const shift = (Math.floor(i / maxbadges) * 480) / maxbadges;
        //Draw the badges!
      const badgeArr = await Canvas.loadImage(badges[i])
      console.log(badgeArr)
        ctx.drawImage(badgeArr[i], x_val, y_val + shift, 450 / maxbadges, 450 / maxbadges);
    }
}
 
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'stamps.png');

  message.channel.send(attachment);

 */
};

module.exports.help = {
  name:"badges",
  aliases: ["badges"]
}
