const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');


module.exports.run = async (bot, message, args) => {


   const { lvl10roles } = require("../arrays/roles_array");
  const { lvl20roles } = require("../arrays/roles_array");
  const { lvl50roles } = require("../arrays/roles_array");


  let lvl10Home = new Discord.MessageEmbed()
  .setTitle('Level 10 Roles')
  .setDescription('Available for levels 10 and up')
  .setImage('https://media.discordapp.net/attachments/509485130847354901/850908556202868769/lvl10roles.png')
  .setColor('#006CFF')
  message.channel.send(lvl10Home)

for (const y of lvl10roles) {
  //BUTTONS & EMBEDS

  let buyButton = new MessageButton()
    .setStyle('green')
    .setLabel('Buy Role')
    .setID(`${y.id}`)
  
  let sellButton = new MessageButton()
    .setStyle('red')
    .setLabel('Sell Role')
    .setID(`${y.id}_sell`)

    let buttons = new MessageActionRow()
    .addComponent(buyButton)
    .addComponent(sellButton)
    
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
    .setDescription(`Are you sure you want to purchase **${y.role}**?\n\n`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter('Note: Selling your role will only return 75% of your credits.')


let embed2 = new Discord.MessageEmbed()
.setTitle(y.role).setColor(`${y.color}`)
.addField('Available at:', 'Level 10')
.addField('Role Preview', `${message.guild.roles.cache.get(`${y.roleid}`)}`)
.addField('Price:', `${y.price} Credits`) 
.addField('Color Hex:', `${y.color}`)
.setColor(y.color).setFooter('NOTE: Selling a role only gives you 75% of your credits back')
.setThumbnail('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=465&height=465')
message.channel.send({embed: embed2, component: buttons })

let receipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`Congratulations! You are now the proud owner of **${y.role}**! \n\n Cost: 10000`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))

let saleReceipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`You sold **${y.role}**! \n\n Refund: 7500 Credits`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))



bot.on('clickButton', async (button) => {

  let user = await button.clicker.fetch();

      let items = await db.fetch(button.clicker.user.id);
     if(items === null) items = "Nothing"
     var level = db.fetch(`guild_${message.guild.id}_level_${button.clicker.user.id}`) || 0;

  if (button.id == y.id) {
    console.log(user.id)
    button.defer()  
  button.clicker.user.send({embed: confirm, ephemeral: true, component: choices }) .then(msg => {msg.delete({ timeout: 30000 })}).catch('error');

  bot.on('clickButton', async (button) => {
          button.defer()
        if (button.id == 'yes_'){
          button.defer()
          if (level < 10){ return button.clicker.user.send('You are not the required level to buy this role!')} 
          else
          if (db.fetch(`money_${message.guild.id}_${button.clicker.user.id}`) < 10000){
            return button.clicker.user.send('You do not have enough credits to buy this role!').then(msg => {msg.delete({ timeout: 5000 })}).catch('error');
    
          } else
          if (items.includes(`${message.guild.roles.cache.get(`${y.roleid}`)}`)){
            return button.clicker.user.send('You already own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
          }  
      
          db.push(button.clicker.user.id, `${message.guild.roles.cache.get(`${y.roleid}`)}`);
          db.subtract(`money_${message.guild.id}_${button.clicker.user.id}`, 10000)

         button.clicker.user.send({embed: receipt, component: returnBtn })

  
            }
        });       
      } 
        if (button.id == `${y.id}_sell`){
          if (items.includes(`${message.guild.roles.cache.get(`${y.roleid}`)}`)){
            db.add(`money_${message.guild.id}_${button.clicker.user.id}`, 7500)
            return  button.clicker.user.send({embed: saleReceipt, component: returnBtn })
          } else  return button.clicker.user.send('You do not own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
        }

  });

}





let lvl20Home = new Discord.MessageEmbed()
.setTitle('Level 20 Roles')
.setDescription('Available for levels 20 and up')
.setImage('https://media.discordapp.net/attachments/509485130847354901/850908553778954270/lvl20roles.png')
.setColor('#006CFF')
message.channel.send(lvl20Home)






for (const x of lvl20roles) {
  
  //BUTTONS & EMBEDS

  let buyButton = new MessageButton()
    .setStyle('green')
    .setLabel('Buy Role')
    .setID(`${x.id}`)
  
  let sellButton = new MessageButton()
    .setStyle('red')
    .setLabel('Sell Role')
    .setID(`${x.id}_sell`)

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
   

  let buttons = new MessageActionRow()
    .addComponent(buyButton)
    .addComponent(sellButton)

  let confirm = new Discord.MessageEmbed()
    .setTitle('Confirm Purchase')
    .setDescription(`Are you sure you want to purchase **${x.role}**?\n\n`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter('Note: Selling your role will only return 75% of your credits.')


let embed2 = new Discord.MessageEmbed()
.setTitle(x.role).setColor(`${x.color}`)
.addField('Available at:', 'Level 20')
.addField('Role Preview', `${message.guild.roles.cache.get(`${x.roleid}`)}`)
.addField('Price:', `${x.price} Credits`) 
.addField('Color Hex:', `${x.color}`)
.setColor(x.color).setFooter('NOTE: Selling a role only gives you 75% of your credits back')
.setThumbnail('https://media.discordapp.net/attachments/492703825287839754/841830226609831956/level_20_stamp.png?width=465&height=465')

message.channel.send({embed: embed2, component: buttons })


let receipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`Congratulations! You are now the proud owner of **${x.role}**! \n\n Cost: 25000`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))

let saleReceipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`You sold **${x.role}**! \n\n Refund: 18750 Credits`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))



bot.on('clickButton', async (button) => {

  let user = await button.clicker.fetch();
  console.log(user.id)
      let items = await db.fetch(button.clicker.user.id);
     if(items === null) items = "Nothing"

     var level = db.fetch(`guild_${message.guild.id}_level_${button.clicker.user.id}`) || 0;

  if (button.id == x.id) {
    button.defer()
       
  button.clicker.user.send({embed: confirm, component: choices }) .then(msg => {msg.delete({ timeout: 30000 })}).catch('error');

        bot.on('clickButton', async (button) => {
          button.defer()
        if (button.id == 'yes_'){
          button.defer()
          if (level < 20){ return button.clicker.user.send('You are not the required level to buy this role!')} 
        if (db.fetch(`money_${message.guild.id}_${button.clicker.user.id}`) < 25000){
            return button.clicker.user.send('You do not have enough credits to buy this role!').then(msg => {msg.delete({ timeout: 5000 })}).catch('error');
          } else
        if (items.includes(`${message.guild.roles.cache.get(`${x.roleid}`)}`)){
            return button.clicker.user.send('You already own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
          }  
         
          db.push(button.clicker.user.id, `${message.guild.roles.cache.get(`${x.roleid}`)}`);
          db.subtract(`money_${message.guild.id}_${button.clicker.user.id}`, 25000)

         button.clicker.user.send({embed: receipt, component: returnBtn })

  
            }
        
        }); 
        
      
          
      } if (button.id == `${x.id}_sell`){
        if (items.includes(`${message.guild.roles.cache.get(`${x.roleid}`)}`)){
          db.add(`money_${message.guild.id}_${button.clicker.user.id}`, 18750)
          return  button.clicker.user.send({embed: saleReceipt, component: returnBtn })
        } else  return button.clicker.user.send('You do not own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
      }
      
   
  });
}



let lvl50Home = new Discord.MessageEmbed()
.setTitle('Level 50 Roles')
.setDescription('Available for levels 50 and up')
.setImage('https://media.discordapp.net/attachments/509485130847354901/850908548581949480/FF_roles.png')
.setColor('#006CFF')
message.channel.send(lvl50Home)




for (const z of lvl50roles) {
  //BUTTONS & EMBEDS

  let buyButton = new MessageButton()
    .setStyle('green')
    .setLabel('Buy Role')
    .setID(`${z.id}`)
  
  let sellButton = new MessageButton()
    .setStyle('red')
    .setLabel('Sell Role')
    .setID(`${z.id}_sell`)

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
   

  let buttons = new MessageActionRow()
    .addComponent(buyButton)
    .addComponent(sellButton)
   


  let confirm = new Discord.MessageEmbed()
    .setTitle('Confirm Purchase')
    .setDescription(`Are you sure you want to purchase **${z.role}**?\n\n`)
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setFooter('Note: Selling your role will only return 75% of your credits.')
    
let embed2 = new Discord.MessageEmbed()
.setTitle(z.role).setColor(`${z.color}`)
.addField('Available at:', 'Level 50')
.addField('Role Preview', `${message.guild.roles.cache.get(`${z.roleid}`)}`)
.addField('Price:', `${z.price} Credits`) 
.addField('Color Hex:', `${z.color}`)
.setDescription(`${z.desc}`)
.setColor(z.color).setFooter('NOTE: Selling a role only gives you 75% of your credits back')
.setThumbnail('https://media.discordapp.net/attachments/492703825287839754/841830222026113054/ff_stamp.png')

message.channel.send({embed: embed2, component: buttons })


let receipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`Congratulations! You are now the proud owner of **${z.role}**! \n\n Cost: 18000`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))

let saleReceipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`You sold **${z.role}**! \n\n Refund: 13500 Credits`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))


bot.on('clickButton', async (button) => {

  let user = await button.clicker.fetch();
  console.log(user.id)
      let items = await db.fetch(button.clicker.user.id);
     if(items === null) items = "Nothing"

  var level = db.fetch(`guild_${message.guild.id}_level_${button.clicker.user.id}`) || 0;
  if (button.id == z.id) {
    button.defer()
       
  button.clicker.user.send({embed: confirm, ephemeral: true, component: choices }) .then(msg => {msg.delete({ timeout: 30000 })}).catch('error');

    bot.on('clickButton', async (button) => {
          button.defer()
        if (button.id == 'yes_'){
          button.defer()
          if (level < 50){ return button.clicker.user.send('You are not the required level to buy this role!')} 
            if (db.fetch(`money_${message.guild.id}_${button.clicker.user.id}`) < 18000){
              return button.clicker.user.send('You do not have enough credits to buy this role!').then(msg => {msg.delete({ timeout: 5000 })}).catch('error');
    
                } else
                   if (items.includes(`${message.guild.roles.cache.get(`${z.roleid}`)}`)){
                     return button.clicker.user.send('You already own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
                       }  
         
                db.push(button.clicker.user.id, `${message.guild.roles.cache.get(`${z.roleid}`)}`);
                db.subtract(`money_${message.guild.id}_${button.clicker.user.id}`, 18000)

                 button.clicker.user.send({embed: receipt, component: returnBtn })

  
            }
        });       
      } 
      if (button.id == `${z.id}_sell`){
        button.defer()
        if (items.includes(`${message.guild.roles.cache.get(`${z.roleid}`)}`)){
          db.add(`money_${message.guild.id}_${button.clicker.user.id}`, 13500)
          return  button.clicker.user.send({embed: saleReceipt, component: returnBtn })
        } else  return button.clicker.user.send('You do not own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
      }
     


  });

}  
   let lvl10Nav = new MessageButton()
.setStyle('url')
.setLabel('Level 10 Roles')
.setURL('https://ptb.discord.com/channels/646074330249429012/840668770447917066/850915837976248392')

let lvl20Nav = new MessageButton()
.setStyle('url')
.setLabel('Level 20 Roles')
.setURL('https://ptb.discord.com/channels/646074330249429012/840668770447917066/850915869159981117')

let lvl50Nav = new MessageButton()
.setStyle('url')
.setLabel('Level 50 Roles')
.setURL('https://ptb.discord.com/channels/646074330249429012/840668770447917066/850915929398968331')

let testBtn = new MessageButton()
.setStyle('blurple')
.setLabel('test')
.setID('test')


let shopNav = new MessageActionRow()
  .addComponent(lvl10Nav)
  .addComponent(lvl20Nav)
  .addComponent(lvl50Nav)
  .addComponent(testBtn)


let shopHome = new Discord.MessageEmbed()
  .setTitle('Dayglow Role Shop')
  .setDescription('**Welcome to the Dayglow Role Shop!**\n\n To navigate around, please choose the appropriate button to take you to a shop section.')
  .setColor('#CB33FF')
  .setThumbnail(message.guild.iconURL({ dynamic: true }))
  .setImage('https://media.discordapp.net/attachments/509485130847354901/850917680227024943/roleshop.png')

/*   message.channel.send({embed: shopHome, component: shopNav, ephemeral: true}) */
 
  bot.on('clickButton', async (button) => {
    let embed = new Discord.MessageEmbed()
    .setDescription('test')
   
  if (button.id == 'test'){
    button.reply.send({embed: shopHome, component: shopNav, ephemeral: true})
    //or with embed/button/options

  }
  });


}



module.exports.help = {
    name: 'guildroles',
    aliases: []
}
