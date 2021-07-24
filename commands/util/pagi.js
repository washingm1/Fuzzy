const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');

const { lvl10roles } = require("../arrays/roles_array");
const { lvl20roles } = require("../arrays/roles_array");
const { lvl50roles } = require("../arrays/roles_array");


module.exports.run = async (client, message, args) => {

    let user = message.mentions.members.first() || message.author;
    //define buttons
let open = new Discord.MessageEmbed()
.setDescription('open shop')

    let openShop = new MessageButton()
    .setStyle('blurple')
    .setLabel('Open Shop')
    .setID('open')

    let shopBut = new MessageActionRow()
    .addComponent(openShop)

    message.channel.send({embed: open, component: shopBut, type: 7})

    client.on('clickButton', async (button) => {
        if (button.id == 'open'){



    let lvl10Nav = new MessageButton()
    .setStyle('blurple')
    .setLabel('Level 10 Roles')
    .setID('lvl10')
    
    let lvl20Nav = new MessageButton()
    .setStyle('blurple')
    .setLabel('Level 20 Roles')
    .setID('lvl20')
    
    
    let lvl50Nav = new MessageButton()
    .setStyle('blurple')
    .setLabel('Level 50 Roles')
    .setID('lvl50')
    

    
    let shopNav = new MessageActionRow()
      .addComponent(lvl10Nav)
      .addComponent(lvl20Nav)
      .addComponent(lvl50Nav)
     

    
    let shopHome = new Discord.MessageEmbed()
      .setTitle('Dayglow Role Shop')
      .setDescription('**Welcome to the Dayglow Role Shop!**\n\n To navigate around, please choose the appropriate button to take you to a shop section.')
      .setColor('#CB33FF')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setImage('https://media.discordapp.net/attachments/509485130847354901/850917680227024943/roleshop.png')

  button.reply.send({embed: shopHome, component: shopNav, type: 7})
           
     client.on('clickButton', async (button) => {
    
        if (button.id == 'lvl10'){

            button.defer()
            let button_back = new MessageButton()
            .setStyle('blurple')
            .setID('1')
            .setLabel("Previous")
        
            let button_home = new MessageButton()
            .setStyle('blurple')
            .setID('2').
            setLabel("🏠") 
            
            let button_forward = new MessageButton()
            .setStyle('blurple')
            .setID('3')
            .setLabel('Next') 

            let returnbtn = new MessageButton()
            .setStyle('blurple')
            .setLabel('Return To Home')
            .setID('return')

        
            
        

        


          //array of all buttons
    

          const allbuttons2 = new MessageActionRow()
          .addComponent(button_back)
          .addComponent(button_home)
          .addComponent(button_forward)
          .addComponent(returnbtn)
    

        
     let FIRSTEMBED = new Discord.MessageEmbed()     
           .setTitle('Dayglow Role Shop')
          .setDescription(`**Welcome to the Dayglow Role Shop, ${user}!**\n\n To navigate around, please choose the appropriate button to take you to a shop section.`)
          .setColor('#CB33FF')
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setImage('https://media.discordapp.net/attachments/509485130847354901/850917680227024943/roleshop.png')
         
     //Send message with buttons
        
          let helpmsg = await button.message.edit({   
              content: `***Click on the __Buttons__ to swap the Help pages***`,
              embed: FIRSTEMBED, 
              component: allbuttons2,
              ephemeral: true
          });
      
          //create a collector for the thinggy
          const collector = helpmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 30000000 }); //collector for 5 seconds
          //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
          
          var embeds = [FIRSTEMBED]
          
    for(const y of lvl10roles)embeds.push(new Discord.MessageEmbed()
         // let i = 0; i< 10; i++
          .setColor(y.color)
          .setTitle(y.role)
          .setColor(y.color)
          .setTitle(y.role)
          .addField('Available At:', 'Level 20')
          .addField('Cost', '10000 Credits')
          .addField('Hex Code', y.color)
          .addField('Role Preview', `${message.guild.roles.cache.get(`${y.roleid}`)}`)
          .setThumbnail('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=468&height=468')
          .setFooter('NOTE: Selling a role only gives you 75% of your credits back')
          )

          for(const y of lvl10roles)buyButton = new MessageButton()
          .setStyle('green')
          .setLabel('Buy Role')
          .setID(`${y.id}_buy`)
        
        sellButton = new MessageButton()
          .setStyle('red')
          .setLabel('Sell Role')
          .setID(`${lvl10roles.id}_sell`)
     


          const allbuttons = new MessageActionRow()
          .addComponent(button_back)
          .addComponent(button_home)
          .addComponent(button_forward)
          .addComponent(buyButton)
          .addComponent(sellButton)

          let currentPage = 0;
    collector.on('collect', b => {
        b.defer(true)
        //page forward

      
        
        if (b.id == 'return'){
            helpmsg.edit({embed: shopHome, component: shopNav, type: 7});
        } else
        if(b.id == "1") {
            if (currentPage !== 0) {
                --currentPage;
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons, type: 7});
            } else {
                currentPage = embeds.length - 1
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons, type: 7});
            }
        }
        //go home
        else if(b.id == "2"){
            currentPage = 0;
            helpmsg.edit({embed:embeds[currentPage], component: allbuttons2, type: 7});
        } 
        //go forward
        else if(b.id == "3"){
            if (currentPage < embeds.length - 1) {
                currentPage++;
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons, type: 7});
            } else {
                currentPage = 0
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons, type: 7});
            } 
        } 
    });


          collector.on('end', collected => {
            helpmsg.edit(helpmsg.embeds[0])
        });
        collector.on("error", (e) => console.log(e))
        }
        
        











        else
        if (button.id == 'lvl20'){
            
            button.defer()
            let button_back = new MessageButton()
            .setStyle('blurple')
            .setID('1')
            .setLabel("Previous")
        
            let button_home = new MessageButton()
            .setStyle('blurple')
            .setID('2').
            setLabel("🏠") 
            
            let button_forward = new MessageButton()
            .setStyle('blurple')
            .setID('3')
            .setLabel('Next') 

            let returnbtn = new MessageButton()
            .setStyle('blurple')
            .setLabel('Return To Home')
            .setID('return')

            

          //array of all buttons
          const allbuttons = new MessageActionRow()
          .addComponent(button_back)
          .addComponent(button_home)
          .addComponent(button_forward)
     
        
     let FIRSTEMBED = new Discord.MessageEmbed()     
           .setTitle('Dayglow Role Shop')
          .setDescription(`**Welcome to the Dayglow Role Shop, ${user}!**\n\n Here you will find the roles available for levels 20+ \n To navigate around, please choose the appropriate button to take you to a shop section.`)
          .setColor('#CB33FF')
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setImage('https://media.discordapp.net/attachments/509485130847354901/850917680227024943/roleshop.png')
         
     //Send message with buttons
        
          let helpmsg = await button.message.edit({   
              content: `***Click on the __Buttons__ to swap the Help pages***`,
              embed: FIRSTEMBED, 
              component: allbuttons,
              ephemeral: true
          });
      
          //create a collector for the thinggy
          const collector = helpmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 30000000 }); //collector for 5 seconds
          //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
          
          var embeds = [FIRSTEMBED]
          
    for(const x of lvl20roles)
      embeds.push(new Discord.MessageEmbed()
         // let i = 0; i< 10; i++
          .setColor(x.color)
          .setTitle(x.role)
          .setColor(x.color)
          .setTitle(x.role)
          .addField('Available At:', 'Level 20')
          .addField('Cost', '25000 Credits')
          .addField('Hex Code', x.color)
          .addField('Role Preview', `${message.guild.roles.cache.get(`${x.roleid}`)}`)
          .setThumbnail('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=468&height=468')
          .setFooter('NOTE: Selling a role only gives you 75% of your credits back')
          )

          
          let currentPage = 0;
    collector.on('collect', b => {
        b.defer(true)
        //page forward
        if(b.id == "1") {
            if (currentPage !== 0) {
                --currentPage;
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            } else {
                currentPage = embeds.length - 1
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            }
        }
        //go home
        else if(b.id == "2"){
            currentPage = 0;
            helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
        } 
        //go forward
        else if(b.id == "3"){
            if (currentPage < embeds.length - 1) {
                currentPage++;
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            } else {
                currentPage = 0
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            }
        }
    });


          collector.on('end', collected => {
            helpmsg.edit(helpmsg.embeds[0])
        });
        collector.on("error", (e) => console.log(e))
        }







        else
        if (button.id == 'lvl50'){
            
            button.defer()
            let button_back = new MessageButton()
            .setStyle('blurple')
            .setID('1')
            .setLabel("Previous")
        
            let button_home = new MessageButton()
            .setStyle('blurple')
            .setID('2').
            setLabel("🏠") 
            
            let button_forward = new MessageButton()
            .setStyle('blurple')
            .setID('3')
            .setLabel('Next') 

            let returnbtn = new MessageButton()
            .setStyle('blurple')
            .setLabel('Return To Home')
            .setID('return')

            

          //array of all buttons
          const allbuttons = new MessageActionRow()
          .addComponent(button_back)
          .addComponent(button_home)
          .addComponent(button_forward)
     
        
     let FIRSTEMBED = new Discord.MessageEmbed()     
           .setTitle('Dayglow Role Shop')
          .setDescription(`**Welcome to the Dayglow Role Shop, ${user}!**\n\n Here you will find the roles available for levels 50+ \n To navigate around, please choose the appropriate button to take you to a shop section.`)
          .setColor('#CB33FF')
          .setThumbnail(message.guild.iconURL({ dynamic: true }))
          .setImage('https://media.discordapp.net/attachments/509485130847354901/850917680227024943/roleshop.png')
         
     //Send message with buttons
        
          let helpmsg = await button.message.edit({   
              content: `***Click on the __Buttons__ to swap the Help pages***`,
              embed: FIRSTEMBED, 
              component: allbuttons,
              ephemeral: true
          });
      
          //create a collector for the thinggy
          const collector = helpmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 30000000 }); //collector for 5 seconds
          //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
          
          var embeds = [FIRSTEMBED]
          
    for(const z of lvl50roles)
      embeds.push(new Discord.MessageEmbed()
         // let i = 0; i< 10; i++
          .setColor(z.color)
          .setTitle(z.role)
          .setColor(z.color)
          .setTitle(z.role)
          .addField('Available At:', 'Level 50')
          .addField('Cost', '18000 Credits')
          .addField('Hex Code', z.color)
          .addField('Role Preview', `${message.guild.roles.cache.get(`${z.roleid}`)}`)
          .setThumbnail('https://media.discordapp.net/attachments/492703825287839754/841830223418097694/level_10_stamp.png?width=468&height=468')
          .setFooter('NOTE: Selling a role only gives you 75% of your credits back')
          )

          
          let currentPage = 0;
    collector.on('collect', b => {
        b.defer(true)
        //page forward
        if(b.id == "1") {
            if (currentPage !== 0) {
                --currentPage;
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            } else {
                currentPage = embeds.length - 1
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            }
        }
        //go home
        else if(b.id == "2"){
            currentPage = 0;
            helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
        } 
        //go forward
        else if(b.id == "3"){
            if (currentPage < embeds.length - 1) {
                currentPage++;
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            } else {
                currentPage = 0
                helpmsg.edit({embed:embeds[currentPage], component: allbuttons});
            }
        }
    });


          collector.on('end', collected => {
            helpmsg.edit(helpmsg.embeds[0])
        });
        collector.on("error", (e) => console.log(e))
        }

    });
  
        }
    

    }
    )};
        













      
  module.exports.help = {
    name:"pagi",
    aliases: [""]
  }