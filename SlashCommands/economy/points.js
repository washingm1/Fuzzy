const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const Canvas = require('canvas');
const translate = require("@iamtraction/google-translate");
const daily = require("./daily");


module.exports = {
    name: "points",
    description: "View your Points",
    userPermissions: ["ADMINISTRATOR"],
    options: [
      {
        name: 'lookup',
        description: 'Which user do you want to look up?',
        type: 'USER',
        required: false,
      },
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const guild = client.guilds.cache.get("646074330249429012");

        const [lookup] = args

        let user = client.users.cache.get(lookup) || interaction.user
        let member = guild.members.cache.get(user.id)
     
        let cmdChannel = interaction.guild.channels.cache.get("733043770454704189")

        let returnEmbed = new MessageEmbed()
        .setTitle('Oops!')
        .setDescription(`Please use ${cmdChannel} for any bot commands`)

        

//User's DB values
let tokens = db.fetch(`token_${guild.id}_${user.id}`)
if (tokens === null) tokens = 0;

let money = await db.fetch(`money_${guild.id}_${user.id}`)
if (money === null) money = 0;

let bank = await db.fetch(`bank_${guild.id}_${user.id}`)
if (bank === null) bank = 0;

 var level = db.fetch(`guild_${guild.id}_level_${user.id}`) || 0;
 var xpNeeded = level * 500 + 250;
  var xp = db.get(`guild_${guild.id}_xp_${user.id}`)

  let items = await db.fetch(user.id, { items: []});

  let workUses = db.fetch(`working_${guild.id}_${user.id}`)
  if(workUses === null) workUses = 0;

  let dailyUses = db.fetch(`dailyUse_${guild.id}_${user.id}`)
if(dailyUses === null) dailyUses = 0;
  //Event Badge
  var winners = db.fetch(`eventWinners_${guild.id}`)
  if(winners === null) winners = 'No known event winners';
     let badgeArray = []
     
        //DAYBRO ROLE
        if(member.roles.cache.has('646075693113016330')){
          badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997508846182400/daybroBadge.png')
      }
             //BOT CREATOR ROLE
             if(member.roles.cache.has('844982960230367264')){
              badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/899418776007745567/botCreatorBadge.png')
          }
//STAFF ROLE
      if(member.roles.cache.has('821866228431585310')){
         badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997523861774356/StaffBadge.png')
     }
//NITRO BOOST ROLE
     if(member.roles.cache.has('734443360173162591')){
         badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997521227759656/nitroBoosterBadge.png')
     }
     //FAT STACKS
     if(member.roles.cache.has('734957985939325009')){
       badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997510184169472/fatStacksBadge.png')
   }  
//LVL 10 BADGE
      if (level >= 10 && level < 20){
       badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997511887056956/lvl10badge.png')
         console.log(`Level 10 achievement, they are level ${level}`)
     }
     //LVL 20 BADGE
     if (level >= 20 && level < 30){
       badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997513518612480/lvl20badge.png')
         console.log(`Level 20 achievement, they are level ${level}`)
     }
//LVL 30 BADGE
     if (level >= 30 && level < 40){
       badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997514915328100/lvl30badge.png')
         console.log(`Level 30 achievement, they are level ${level}`)
     }
     //LVL 40 BADGE
     if (level >= 40 && level < 50){
       badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997516823736400/lvl40badge.png')
         console.log(`Level 30 achievement, they are level ${level}`)
     }
     //LVL 50 BADGE
     if (level >= 50 && level < 100){
       badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/890253035236892722/lvl50badge.png')
         console.log(`Level 50 achievement, they are level ${level}`)
     }
//LVL 100 BADGE
     if (level >= 100){
         badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/889997520179195934/lvl100badge.png')
           console.log(`Level 50 achievement, they are level ${level}`)
       }
  //WORK BADGES
if (workUses >=100 && workUses < 250){
  badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/891412888936411186/work250Badge.png')
}
if (workUses >= 250 && workUses < 500){
  badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/891412887401299978/work100Badge.png')
}
if (workUses >= 500 && workUses < 1000){
  badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/891412894523211856/work500Badge.png')
}
  //PARTNERED BADGE
       if(member.roles.cache.has('891742163724013619')){
        badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/891412885908095016/partneredBadge.png')
    }
  //DAILY USES
  if (dailyUses >= 100){
    badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/891412884767272991/daily100Badge.png')
  } console.log(dailyUses)
/*   //EVENT WINNER
  if (winners.includes(`${user}`)){
    badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/891781777708949534/eventWinnerBadge.png')
  } */
    //DAYBRO ROLE
    if(member.roles.cache.has('734961500636315799')){
      badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/897104192760582194/FuzzybrainVinylBadge.png')
  }
    //DAYBRO ROLE
    if(member.roles.cache.has('883440464626319361')){
      badgeArray.push('https://media.discordapp.net/attachments/889997466701824060/897104194400555018/hhvinylbadge.png')
  }
  //DAILY USES


//Start the Canvas
const { registerFont, createCanvas } = require('canvas')
registerFont('./font/Neon.ttf', { family: 'Neon' }) 

const canvas = Canvas.createCanvas(780, 600);  
const ctx = canvas.getContext('2d');

if (level >= 50) var background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/896130527923417108/points.png?width=608&height=468');
if (level < 50) var background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/896130527923417108/points.png?width=608&height=468')
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


//User's leaderboard position
const array = db.all().filter(i => i.ID.startsWith(`xptotal_646074330249429012_`)).sort((a, b) => b.data - a.data) // This is your usual leaderboard.
const tosee = (element) => element.ID == `xptotal_646074330249429012_${user.id}` // This is a function to help us find the position of you on the leaderboard.
const position = array.findIndex(tosee) + 1 || "N/A" // This should find the index of the first value that satisfies the function of tosee (see above) and return it

ctx.font = "40px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#FFFFFF';
ctx.fillText('#' + position, 680, 85);



const memberFetch = await guild.members.cache.get(user.id);
nickname = memberFetch.displayName;

const credits = "Credits"
const translated = await translate(credits, { to: 'es' })

//USER DATA
ctx.font = "30px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#FFFFFF';
ctx.fillText(money + ` Credits`, 40, 340);

ctx.font = "30px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#FFFFFF';
ctx.fillText(bank + ` Credits`, 30, 500);



ctx.font = "40px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#FFFFFF';
ctx.fillText(`Level\n  ${level}`, 255, 168)


ctx.font = "30px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#FFFFFF';
ctx.fillText(tokens + " Token(s)" , 45, 420);




//USERNAME
if (nickname.length > 16){
  nickname = `${nickname.slice(0, 20)}...`
ctx.font = `Bold 34px Neon`;
ctx.textAlign - "center";
ctx.fillStyle = memberFetch.displayHexColor; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText(nickname, 480, 90);
} else {
  ctx.font = `Bold 55px Neon`;
ctx.textAlign - "center";
ctx.fillStyle = memberFetch.displayHexColor; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText(nickname, 480, 100);
}

//XP BAR
ctx.beginPath();
ctx.lineWidth = 4;
ctx.strokeStyle = "#000000";
ctx.globalAlpha = 0.5;
ctx.fillStyle = "#000000";
ctx.fillRect(30,540, 300, 44);
ctx.fill();
ctx.globalAlpha = 1;
ctx.strokeRect(30, 540, 300, 44);
ctx.stroke();

ctx.fillStyle = "#d94e0d";
ctx.globalAlpha = 1;
ctx.fillRect(32, 542,((100 / (xpNeeded / xp)) * 3)  , 40);
ctx.fill();
ctx.globalAlpha = 1;

//AVATAR
const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
ctx.drawImage(avatar, 24, 27, 196, 196);



//XP BAR TEXT
ctx.font = "24px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#FFFFFF';
ctx.fillText(`${xp}/${xpNeeded} xp`, 178, 569);


  //A little fun
  let ranString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

   ctx.font = "22px Neon";
   ctx.textAlign - "center";
   ctx.fillStyle = '#000000';
   ctx.fillText(`ID ${ranString}`, 600, 570);

   if(member.roles.cache.has('821866228431585310')){
    const stafftrust = await Canvas.loadImage('https://media.discordapp.net/attachments/889997466701824060/891363824425398402/staffBadge.png');
ctx.drawImage(stafftrust, 250, 39, 80, 80);

 }

          
        for (var i in badgeArray) { 
            const y_val = 166;
            const maxbadges = Math.max(3, Math.ceil(Math.sqrt(badgeArray.length)));
            const x_val = (360 / maxbadges) * (i % maxbadges) + 402;
            const shift = (Math.floor(i / maxbadges) * 345) / maxbadges;

            const avatar = await Canvas.loadImage(badgeArray[i]);
            ctx.drawImage(avatar, x_val, y_val + shift, 340 / maxbadges, 340 / maxbadges);
        }

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'points.png'); 

        interaction.editReply({ files: [attachment] });


    }

};




