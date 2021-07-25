const Discord = require('discord.js')
const db = require('quick.db')
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports.run = async (bot, message, args) => {
   
    if(!message.content.startsWith('!'))return; 
    let user = message.author;
    let amount = db.fetch(`money_${message.guild.id}_${user.id}`)

   
if (!args[0]){
    message.channel.send('Please enter a valid role to buy!')
}

if(args[0] == 'vinyl') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 50,000 coins to purchase ${message.guild.roles.cache.get('734961500636315799')}`);

    let vinyl = await db.fetch(`vinyl_${message.guild.id}_${user.id}`)
    
    if (vinyl > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 50000){ return message.channel.send(Embed2)}
   
    db.fetch(`vinyl_${message.guild.id}_${user.id}`)
    db.add(`vinyl_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('734961500636315799')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('734961500636315799')} For 10000 Credits!`);

    await message.guild.members.cache.get(user.id).roles.add('734961500636315799');
    
    db.subtract(`money_${message.guild.id}_${user.id}`, 50000)
    message.channel.send(Embed3)
}

if(args[0] == 'stacks') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 100,000 coins to purchase ${message.guild.roles.cache.get('734957985939325009')}`);

    let stacks = await db.fetch(`stacks_${message.guild.id}_${user.id}`)
    
    if (stacks > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 100000){ return message.channel.send(Embed2)}
   
    db.fetch(`stacks_${message.guild.id}_${user.id}`)
    db.add(`stacks_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('734957985939325009')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('734957985939325009')} For 100000 Credits!`);

    await message.guild.members.cache.get(user.id).roles.add('734957985939325009');

    db.subtract(`money_${message.guild.id}_${user.id}`, 100000)
    message.channel.send(Embed3)
}


   
let yesBtn = new MessageButton()
.setStyle('green')
.setLabel('Confirm Purchase')
.setID('yes_')


let choices = new MessageActionRow()
.addComponent(yesBtn)



let confirm = new Discord.MessageEmbed()
.setTitle('Confirm Purchase')
.setDescription(`Are you sure you want to purchase **${args[0]}**?\n\n`)
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setFooter('Note: Selling your role will only return 75% of your credits.')



let receipt = new Discord.MessageEmbed()
.setTitle('Success!')
.setDescription(`Congratulations! You are now the proud owner of **${args[0]}**! \n\n Cost: 10000`)
.setTimestamp()
.setFooter('FuzzyBot')
.setThumbnail(message.guild.iconURL({ dynamic: true }))


let returnBtn = new MessageButton()
.setStyle('url')
.setURL('https://discord.com/channels/646074330249429012/732726820893360140/844978789435047966')
.setLabel('Return to Dayglow')




if(args[0] == 'redclay') {

    message.author.send({embed: confirm, component: choices})

    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813162086149914664')}`);

    let items = await db.fetch(message.author.id);
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;

    bot.on('clickButton', async (button) => {
        button.defer()
      if (button.id == 'yes_'){
        button.defer()
        if (level < 10){ return message.author.send('You are not the required level to buy this role!')} 
        else
        if (db.fetch(`money_${message.guild.id}_${button.clicker.user.id}`) < 10000){
          return message.author.send('You do not have enough credits to buy this role!').then(msg => {msg.delete({ timeout: 5000 })}).catch('error');
  
        } else
        if (items.includes(`${message.guild.roles.cache.get(`813162086149914664`)}`)){
          return message.author.send('You already own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
        }  
       
        db.push(message.author.id, `${message.guild.roles.cache.get('813162086149914664')}`)

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)


       message.author.send({embed: receipt, component: returnBtn })


          }
      }); 


}






if(args[0] == 'lightbrown') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813153670467944459')}`);

    let lbrown = await db.fetch(`lbrown_${message.guild.id}_${user.id}`)
    
    if (lbrown > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`lbrown_${message.guild.id}_${user.id}`)
    db.add(`lbrown_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813153670467944459')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813153670467944459')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}





if(args[0] == 'clay') {

    message.author.send({embed: confirm, component: choices})

    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813152807720583180')}`);

    let items = await db.fetch(message.author.id);
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    
    bot.on('clickButton', async (button) => {
        button.defer()
      if (button.id == 'yes_'){
        button.defer()
        if (level < 10){ return message.author.send('You are not the required level to buy this role!')} 
        else
        if (db.fetch(`money_${message.guild.id}_${button.clicker.user.id}`) < 10000){
          return message.author.send('You do not have enough credits to buy this role!').then(msg => {msg.delete({ timeout: 5000 })}).catch('error');
  
        } else
        if (items.includes(`${message.guild.roles.cache.get(`813152807720583180`)}`)){
          return message.author.send('You already own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
        }  
       
        db.push(message.author.id, `${message.guild.roles.cache.get('813152807720583180')}`)

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)


       message.author.send({embed: receipt, component: returnBtn })


          }
      }); 


}




if(args[0] == 'turquoise') {

    message.author.send({embed: confirm, component: choices})

    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813152038346817597')}`);

    let items = await db.fetch(message.author.id);
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    
    bot.on('clickButton', async (button) => {
        button.defer()
      if (button.id == 'yes_'){
        button.defer()
        if (level < 10){ return message.author.send('You are not the required level to buy this role!')} 
        else
        if (db.fetch(`money_${message.guild.id}_${button.clicker.user.id}`) < 10000){
          return message.author.send('You do not have enough credits to buy this role!').then(msg => {msg.delete({ timeout: 5000 })}).catch('error');
  
        } else
        if (items.includes(`${message.guild.roles.cache.get(`813152038346817597`)}`)){
          return message.author.send('You already own this role!').then(msg => {msg.delete({ timeout: 5000 }) }).catch('error');
        }  
       
        db.push(message.author.id, `${message.guild.roles.cache.get('813152038346817597')}`)

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)


       message.author.send({embed: receipt, component: returnBtn })


          }
      }); 


}


















}
  
  module.exports.help = {
    name:"buy",
    aliases: [""]
  }