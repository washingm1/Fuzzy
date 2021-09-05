const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const { MessageActionRow, MessageButton } = require('discord.js');
const Canvas = require('canvas');


module.exports = {
    name: "points",
    description: "Check your level, balance, tokens",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
console.log(interaction)
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        
        let user = interaction.options.getUser('youruseroption') || interaction.user
        const guild = client.guilds.cache.get("646074330249429012");

        
//User's DB values
let tokens = db.fetch(`token_${guild.id}_${user.id}`)
if (tokens === null) tokens = 0;

let money = await db.fetch(`money_${guild.id}_${user.id}`)
if (money === null) money = 0;

let bank = await db.fetch(`bank_${guild.id}_${user.id}`)
if (bank === null) bank = 0;

 var level = db.fetch(`guild_${guild.id}_level_${user.id}`) || 0;
 var xpNeeded = level * 850 + 500;
     var xp = db.get(`guild_${guild.id}_xp_${user.id}`)

     let items = await db.fetch(user.id, { items: []});


//Start the Canvas
const { registerFont, createCanvas } = require('canvas')
registerFont('./font/Neon.ttf', { family: 'Neon' }) 


const canvas = Canvas.createCanvas(500,300);  
const ctx = canvas.getContext('2d');

let background = []

background = await Canvas.loadImage('https://media.discordapp.net/attachments/732757852615344139/872159187549962260/hh_profilecard.png');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);



//User's leaderboard position
const array = db.all().filter(i => i.ID.startsWith(`xptotal_646074330249429012_`)).sort((a, b) => b.data - a.data) // This is your usual leaderboard.
const tosee = (element) => element.ID == `xptotal_646074330249429012_${user.id}` // This is a function to help us find the position of you on the leaderboard.
const position = array.findIndex(tosee) + 1 || "N/A" // This should find the index of the first value that satisfies the function of tosee (see above) and return it


ctx.font = "30px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000';
ctx.fillText('#' + position, 150, 40);
ctx.l

const memberFetch = await guild.members.cache.get(user.id);
nickname = memberFetch.displayName;

//USER DATA

ctx.font = "24px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000';
ctx.fillText(money, 300, 165);
ctx.Line

ctx.font = "20px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000';
ctx.fillText(bank, 425, 164);


ctx.font = "25px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000';
ctx.fillText(level, 300, 230);

ctx.font = "25px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#000000';
ctx.fillText(tokens, 380, 230);




//USERNAME
if (nickname.length > 16){
nickname = `${nickname.slice(0, 12)}...`
}
ctx.font = "Bold 25px Neon";
ctx.textAlign - "center";
ctx.fillStyle = memberFetch.displayHexColor; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText(nickname, 120, 193);

ctx.font = "Bold 22px Neon";
ctx.textAlign - "center";
ctx.fillStyle = "#FFFFFF"; //(message.guild.member(user).displayHexColor);
ctx.textAlign = "center";
ctx.fillText('#' + user.discriminator, 55, 258);

//XP BAR
ctx.beginPath();
ctx.lineWidth = 4;
ctx.strokeStyle = "#522513";
ctx.globalAlpha = 0.2;
ctx.fillStyle = "#000000";
ctx.fillRect(260,255, 200, 30);
ctx.fill();
ctx.globalAlpha = 1;
ctx.strokeRect(260, 255, 200, 30);
ctx.stroke();

ctx.fillStyle = "#d69111";
ctx.globalAlpha = 1;
ctx.fillRect(262, 257,((100 / (xpNeeded / xp)) * 2)  ,26);
ctx.fill();
ctx.globalAlpha = 1;

//AVATAR
const avatar = await Canvas.loadImage(interaction.member.user.displayAvatarURL({ format: 'jpg' }));
ctx.drawImage(avatar, 15, 13, 125, 125);



//XP BAR TEXT
ctx.font = "20px Neon";
ctx.textAlign - "center";
ctx.fillStyle = '#FFFFFF';
ctx.fillText(`${xp}/${xpNeeded} xp`, 360, 276);


const tokenLogo = await Canvas.loadImage('https://media.discordapp.net/attachments/492703825287839754/856923632583704646/tokenLogo.png');
ctx.drawImage(tokenLogo, 25, 335, 40, 40);


  //A little fun
  let ranString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

   ctx.font = "12px Neon";
   ctx.textAlign - "center";
   ctx.fillStyle = '#000000';
   ctx.fillText(`ID ${ranString}`, 90, 290);


   //sending the profile
const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'profile.png');

interaction.editReply({files: [attachment]});


},

};