const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');
const { reply } = require('canvacord/src/Canvacord');
require('discord-slider')(client);

module.exports.run = async (bot, message, args) => {

  const { lvl10roles } = require("../arrays/roles_array");
  const { lvl20roles } = require("../arrays/roles_array");
  const { lvl50roles } = require("../arrays/roles_array");

  let button_back = new MessageButton().setStyle('green').setID('1').setLabel("<<")
  let button_home = new MessageButton().setStyle('blurple').setID('2').setLabel("🏠") 
  let button_forward = new MessageButton().setStyle('green').setID('3').setLabel('>>') 

  let FIRSTEMBED = new Discord.MessageEmbed().setColor("RED").setDescription("PLACEHOLDER FOR HELP MENU 1")
  
  for(yBuy of lvl10roles) button.push(new MessageButton().setStyle('blurple').setID('buyButton').setLabel('Buy'))

  let allbuttons = new MessageActionRow()
  .addComponent(yBuy)
  .addComponent(button_back)
  .addComponent(button_home)
  .addComponent(button_forward)
  let helpmsg = await message.channel.edit({   
    content: `***Click on the __Buttons__ to swap the Help pages***`,
    embed: FIRSTEMBED, 
    component: allbuttons,
    ephemeral: true
});



const collector = helpmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 60e3 }); //collector for 5 seconds
  //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  var embeds = [FIRSTEMBED]
  for(y of lvl10roles) embeds.push(new Discord.MessageEmbed().setColor("RANDOM").setDescription(y.role))

  let currentPage = 0;
  collector.on('collect', b => {
      b.defer(true)
      //page forward
      if(b.id == "1") {
          if (currentPage !== 0) {
              --currentPage;
              helpmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
          } else {
              currentPage = embeds.length - 1
              helpmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
          }
      }
      //go home
      else if(b.id == "2"){
          currentPage = 0;
          helpmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
      } 
      //go forward
      else if(b.id == "3"){
          if (currentPage < embeds.length - 1) {
              currentPage++;
              helpmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
          } else {
              currentPage = 0
              helpmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
          }
      }

  });

  collector.on('end', collected => {
      helpmsg.edit(helpmsg.embeds[0])
  });
  collector.on("error", (e) => console.log(e))



}




module.exports.help = {
    name: 'shoptest',
    aliases: []
}
