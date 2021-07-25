const Discord = require('discord.js')
const db = require('quick.db')
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const Canvas = require('canvas');


module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  

    
    if (!message.member.hasPermission('ADMINISTRATOR')) {
      return message.reply('You do not have enough permission to use this command.')
  }
    if(!message.content.startsWith('!'))return;{
      let embed1 = new Discord.MessageEmbed()
              
      .setTitle('Fuzzybrain Vinyl')
      .setColor('#175fca')
      .addField('**Price**', '50,000', true)
      .addField('**Buy:**', '!buy vinyl', true)
      .setDescription('Be the proud owner of a fuzzybrain vinyl! (Not actually of course)')
      .addField('Displays Stamp', 'yes' ,true)
      .setFooter('Will not change name color')
      let msgEmbed = await message.channel.send(embed1) 
      }
  
      if(!message.content.startsWith('!'))return;{
        let embed1 = new Discord.MessageEmbed()
                
        .setTitle(':moneybag: Fat Stacks :moneybag: ')
        .setColor('#14f136')
        .addField('**Price**', '100,000', true)
        .addField('**Buy:**', '!buy stacks', true)
        .setDescription("A role to say that you're rich")
        .addField('Displays Stamp', 'yes')
        .setFooter('Will not change name color')
        let msgEmbed = await message.channel.send(embed1) 
        }


    if(!message.content.startsWith('!'))return;{
      let embed1 = new Discord.MessageEmbed()
              
      .setTitle('Dayglow Olive')
      .setColor('#82bb73')
      .addField('**Price**', '10,000', true)
      .addField('**Color Hex:**', '#82bb73',true)
      .addField('**Buy:**', '"!buy olive"', true)
      .addField('**Color Role:**','Yes', true)
      let msgEmbed = await message.channel.send(embed1) 

      }
  
      if(!message.content.startsWith('!'))return;{
        let embed1 = new Discord.MessageEmbed()
                
        .setTitle('Dayglow Brown')
        .setColor('#907860')
        .addField('**Price**', '10,000', true)
        .addField('**Color Hex:**', '#907860',true)
        .addField('**Buy:**', '"!buy brown"', true)
        
        .addField('**Color Role:**','Yes', true)
        let msgEmbed = await message.channel.send(embed1) 
        
    
      }
      if(!message.content.startsWith('!'))return;{
        let embed1 = new Discord.MessageEmbed()
                
        .setTitle('Dayglow Red Clay')
        .setColor('#c46413')
        .addField('**Price**', '10,000', true)
        .addField('**Color Hex:**', '#c46413',true)
        .addField('**Buy:**', '"!buy redclay"', true)

        .addField('**Color Role:**','Yes', true)
        let msgEmbed = await message.channel.send(embed1) 
      } 
        
        if(!message.content.startsWith('!'))return;{
          let embed1 = new Discord.MessageEmbed()
                  
          .setTitle('Dayglow Light Brown')
          .setColor('#c2a289')
          .addField('**Price**', '10,000', true)
          .addField('**Color Hex:**', '#c2a289',true)
          .addField('**Buy:**', '"!buy lightbrown"', true)

          .addField('**Color Role:**','Yes', true)
          let msgEmbed = await message.channel.send(embed1) 
      } 
          if(!message.content.startsWith('!'))return;{
            let embed1 = new Discord.MessageEmbed()
                    
            .setTitle('Dayglow Clay')
            .setColor('#916d6d')
            .addField('**Price**', '10,000', true)
            .addField('**Color Hex:**', '#916d6d',true)
            .addField('**Buy:**', '"!buy clay"', true)
      
            .addField('**Color Role:**','Yes', true)
            let msgEmbed = await message.channel.send(embed1) 
      } 

            if(!message.content.startsWith('!'))return;{
              let embed1 = new Discord.MessageEmbed()
                      
              .setTitle('Dayglow Turquoise')
              .setColor('#79adad')
              .addField('**Price**', '10,000', true)
              .addField('**Color Hex:**', '#79adad',true)
              .addField('**Buy:**', '"!buy turquoise"', true)
              
              .addField('**Color Role:**','Yes', true)
              let msgEmbed = await message.channel.send(embed1) 
      } 
             
              if(!message.content.startsWith('!'))return;{
                let embed1 = new Discord.MessageEmbed()
                        
                .setTitle('Dayglow Tan')
                .setColor('#d3bca7')
                .addField('**Price**', '10,000', true)
                .addField('**Color Hex:**', '#d3bca7',true)
                .addField('**Buy:**', '"!buy tan"', true)
          
                .addField('**Color Role:**','Yes', true)
                let msgEmbed = await message.channel.send(embed1) 
      } 

      if(!message.content.startsWith('!'))return;{
        let embed = new Discord.MessageEmbed()
          
          .setTitle('Medicine Maroon')
          .setColor('#860a0a')
          .addField('**Price**', '25,000 Credits', true)
      
          .addField('**Color Hex:**', '#860a0a',true)
          .addField('**Buy:**', '"!buy maroon"', true)
  
          .addField('**Color Role:**','Yes', true)
          let msgEmbed = await message.channel.send(embed)                   
  }


if(!message.content.startsWith('!'))return;{
      let embed = new Discord.MessageEmbed()
        
        .setTitle('Hot Rod Red')
        .setColor('#f52626')
        .addField('**Price**', '25,000 Credits', true)
    
        .addField('**Color Hex:**', '#f52626',true)
        .addField('**Buy:**', '"!buy red"', true)

        .addField('**Color Role:**','Yes', true)
        let msgEmbed = await message.channel.send(embed)                   
}


if(!message.content.startsWith('!'))return;{
let embed1 = new Discord.MessageEmbed()
        
.setTitle('Can I Gold You Tonight?')
.setColor('#ffd02c')
.addField('**Price**', '25,000 Credits', true)

.addField('**Color Hex:**', '#ffd02c',true)
.addField('**Buy:**', '"!buy gold"', true)

.addField('**Color Role:**','Yes', true)
let msgEmbed = await message.channel.send(embed1) 

}
if(!message.content.startsWith('!'))return;{
let embed1 = new Discord.MessageEmbed()
        
.setTitle('False Direction Dandelion')
.setColor('#fffb00')
.addField('**Price**', '25,000 Credits', true)

.addField('**Color Hex:**', '#fffb00',true)
.addField('**Buy:**', '"!buy dandelion"', true)

.addField('**Color Role:**','Yes', true)
let msgEmbed = await message.channel.send(embed1) 
}


if(!message.content.startsWith('!'))return;{
  let embed1 = new Discord.MessageEmbed()
          
  .setTitle('December Green')
  .setColor('#b0fc38')
  .addField('**Price**', '25,000 Credits', true)
  
  .addField('**Color Hex:**', '#b0fc38',true)
  .addField('**Buy:**', '"!buy december"', true)
  
  .addField('**Color Role:**','Yes', true)
  let msgEmbed = await message.channel.send(embed1) 
  }
  

  if(!message.content.startsWith('!'))return;{
    let embed1 = new Discord.MessageEmbed()
            
    .setTitle('Like Ivy')
    .setColor('#97e28b')
    .addField('**Price**', '25,000 Credits', true)
    
    .addField('**Color Hex:**', '#97e28b',true)
    .addField('**Buy:**', '"!buy ivy"', true)
    
    .addField('**Color Role:**','Yes', true)
    let msgEmbed = await message.channel.send(embed1) 
    }
  
    
if(!message.content.startsWith('!'))return;{
  let embed1 = new Discord.MessageEmbed()
          
  .setTitle('Listerine Blue')
  .setColor('#32ece4')
  .addField('**Price**', '25,000 Credits', true)

  .addField('**Color Hex:**', '#32ece4',true)
  .addField('**Buy:**', '"!buy listerine"', true)

  .addField('**Color Role:**','Yes', true)
  let msgEmbed = await message.channel.send(embed1) 
}


if(!message.content.startsWith('!'))return;{
  let embed1 = new Discord.MessageEmbed()
          
  .setTitle('Into Blue')
  .setColor('#56a6fc')
  .addField('**Price**', '25,000 Credits', true)

  .addField('**Color Hex:**', '#56a6fc',true)
  .addField('**Buy:**', '"!buy iblue"', true)

  .addField('**Color Role:**','Yes', true)
  let msgEmbed = await message.channel.send(embed1) 
}




if(!message.content.startsWith('!'))return;{
    let embed1 = new Discord.MessageEmbed()
            
    .setTitle('Something Sapphire')
    .setColor('#175fca')
    .addField('**Price**', '25,000 Credits', true)
   
    .addField('**Color Hex:**', '#175fca',true)
    .addField('**Buy:**', '"!buy sapphire"', true)

    .addField('**Color Role:**','Yes', true)
    let msgEmbed = await message.channel.send(embed1) 
    
    }
  if(!message.content.startsWith('!'))return;{
    let embed1 = new Discord.MessageEmbed()
            
    .setTitle('Close To You Coral')
    .setColor('#fd8f63')
    .addField('**Price**', '25,000 Credits', true)
   
    .addField('**Color Hex:**', '#fd8f63',true)
    .addField('**Buy:**', '"!buy coral"', true)
  
    .addField('**Color Role:**','Yes', true)
    let msgEmbed = await message.channel.send(embed1) 
    
    }
  if(!message.content.startsWith('!'))return;{
    let embed1 = new Discord.MessageEmbed()
              
    .setTitle('Junior Varsity Violet')
    .setColor('#b274f5')
    .addField('**Price**', '25,000 Credits', true)
   
    .addField('**Color Hex:**', '#b274f5',true)
    .addField('**Buy:**', '"!buy violet"', true)
    
    .addField('**Color Role:**','Yes', true)
      let msgEmbed = await message.channel.send(embed1) 
      
      }  if(!message.content.startsWith('!'))return;{
        let embed1 = new Discord.MessageEmbed()
                  
        .setTitle('Dear Friend Pink')
        .setColor('#ffb3f7')
        .addField('**Price**', '25,000 Credits', true)

        .addField('**Color Hex:**', '#ffb3f7',true)
        .addField('**Buy:**', '"!buy pink"', true)
      
        .addField('**Color Role:**','Yes', true)
        let msgEmbed = await message.channel.send(embed1) 
      }
         
      if(!message.content.startsWith('!'))return;{
        let embed1 = new Discord.MessageEmbed()
                  
        .setTitle('Nicknames Peach')
        .setColor('#ff9c9c')
        .addField('**Price**', '25,000 Credits', true)

        .addField('**Color Hex:**', '#ff9c9c',true)
        .addField('**Buy:**', '"!buy peach"', true)
     
        .addField('**Color Role:**','Yes', true)

          let msgEmbed = await message.channel.send(embed1) 
          
          }
          if(!message.content.startsWith('!'))return;{
            let embed1 = new Discord.MessageEmbed()
                      
            .setTitle('Dayglow Black')
            .setColor('#0a0a0a')
            .addField('**Price**', '25,000 Credits', true)
         
            .addField('**Color Hex:**', '#0a0a0a',true)
            .addField('**Buy:**', '"!buy black"', true)
          
            .addField('**Color Role:**','Yes', true)

              let msgEmbed = await message.channel.send(embed1) 
              
              }      
              if(!message.content.startsWith('!'))return;{
                let embed1 = new Discord.MessageEmbed()
                          
                .setTitle('Fair Game Grey')
                .setColor('#e6e6e6')
                .addField('**Price**', '25,000 Credits', true)
                
                .addField('**Color Hex:**', '#e6e6e6',true)
                .addField('**Buy:**', '"!buy grey"', true)
              
                .addField('**Color Role:**','Yes', true)
                  let msgEmbed = await message.channel.send(embed1) 
                  
                  }          
}


module.exports.help = {
  name:"store",
  aliases: ["st"]
}


