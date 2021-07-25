const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');

const { colorRoles } = require("./role_id");


console.log(colorRoles)

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
    let items = await db.fetch(message.author.id, { items: []});
    let user = message.guild.members.cache.get(message.author.id)
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    let amount = db.fetch(`money_${message.guild.id}_${user.id}`)

    if(items === null) items = "Nothing";


for (const x of colorRoles) {
        if (args[0] == `${x.id}`) {

  let yesBtn = new MessageButton()
    .setStyle('green')
    .setLabel('Confirm Purchase')
    .setID('yes_')


  let returnBtn = new MessageButton()
    .setStyle('url')
    .setURL('https://discord.com/channels/646074330249429012/732726820893360140/844978789435047966')
    .setLabel('Return to Dayglow')


  let choices = new MessageActionRow()
    .addComponent(yesBtn)

   


  let confirm = new Discord.MessageEmbed()
    .setTitle('Confirm Purchase')
    .setDescription(`Are you sure you want to purchase **${x.role}**?\n\n`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter('Note: Selling your role will only return 75% of your credits.')


let receipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`Congratulations! You are now the proud owner of **${x.role}**! \n\n Cost: **${x.price}** credits\n Here's your receipt!`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))



let  levelsToGo = x.levelreq - level
let lowLevel = new Discord.MessageEmbed()
.setTitle('Oops!')
.setDescription(`It looks like you are not the required level to buy this role. Only **${levelsToGo} levels** to go!`)
.setColor('RANDOM')

let rejectEmbed = new Discord.MessageEmbed()
.setTitle('Oops!')
.setDescription('You already own this role!');

let sufficient = x.price - amount
let embed = new Discord.MessageEmbed()
.setTitle('Oops!')
.setDescription(`Not enough Funds, you need **${sufficient} more credits**`);


if (level < x.levelreq) {
       
  return message.author.send(lowLevel)
 }
 else
       if (items.includes(`${message.guild.roles.cache.get(`${x.roleid}`)}`)){
        
         return message.author.send(rejectEmbed)            
       }
   else
        if (amount < `${x.price}`) {
          console.log(`${x.price}`)
  
           return message.author.send(embed);
          }

       //   message.author.send({embed: confirm, component: choices}).then(msg => {msg.delete({ timeout: 30000 })}).catch('error');

     message.author.send(receipt)

    db.push(message.author.id, `${message.guild.roles.cache.get(x.roleid)}`)
    db.subtract(`money_${message.guild.id}_${user.id}`, `${x.price}`)
         

}
}
}

module.exports.help = {
    name: "buy",
    description: "Equip Role",
    aliases: ["buy"]
}
