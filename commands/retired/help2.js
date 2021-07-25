const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');
require('discord-slider')(client); // must be below your discord.Client()

module.exports.run = async (client, message, args) => {

  let button_back = new MessageButton().setStyle('green').setID('1').setLabel("<<")
  let button_home = new MessageButton().setStyle('blurple').setID('2').setLabel("🏠") 
  let button_forward = new MessageButton().setStyle('green').setID('3').setLabel('>>') 

  let allbuttons = new MessageActionRow()
  .addComponent(button_back)
  .addComponent(button_home)
  .addComponent(button_forward)

  let FIRSTEMBED = new Discord.MessageEmbed().setColor("RED").setDescription("PLACEHOLDER FOR HELP MENU 1")
  
  let helpmsg = await message.channel.send({   
      content: `***Click on the __Buttons__ to swap the Help pages***`,
      embed: FIRSTEMBED, 
      component: allbuttons,
      ephemeral: true
  });

  const collector = helpmsg.createButtonCollector((button) => button.clicker.user.id === message.author.id, { time: 60e3 }); //collector for 5 seconds
  
  var embeds = [FIRSTEMBED]
  for(let i = 0; i< 10; i++) embeds.push(new Discord.MessageEmbed().setColor("RANDOM").setDescription(i))
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

module.exports.help = {
    name: "help2",
    description: "View inventory",
    aliases: ["help"]
}