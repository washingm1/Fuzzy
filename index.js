const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const prefix="!";
const db = require('quick.db');
const Canvacord = require('canvacord');
const client = new Discord.Client(); 
const { Slash } = require('discord-slash-commands');
const { profile } = require("console");
const slash = new Slash(bot);

require('discord-buttons')(bot)

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}` || `./util/${f}` );
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      bot.aliases.set(alias, props.help.name);
  
  });
});


})


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`In Development`);
  bot.user.setStatus('dnd');  

  const Discord = require('discord.js');
  const client = new Discord.Client();

  

 slash.command({
          guildOnly: true,
          guildID: "646074330249429012",
          data: {
              name: "ping",
              description: "Ping pong?",
              type: 4,
              content: `Pong! \`${bot.ws.ping}ms\``,
              
          }
      })
 
      const embed = new Discord.MessageEmbed()
      .setTitle('This is a test')
      .setDescription('Test')
      slash.command({
        
        guildOnly: true,
        guildID: "646074330249429012",
        data: {
            name: "help",
            description: "Get help from the Bot",
            type: 4,
            content: embed
           
        
            
        }
    })

    

  bot.on("message", async message => {
    if(message.author.bot) return;
     if(message.channel.type === "dm"){
        if(message.content === "2080"){
          let embed = new Discord.MessageEmbed()
          .setTitle('Good Job!')
          .setColor('RANDOM')
          .setDescription('You cracked the first clue! To advance, you must unscramble this phrase:\n\nqaesonnstwarneudesatcripiio')
          .setFooter('HINT: There are three words, the first letter in the scramble, is the first letter of the first word')
          message.author.send(embed)

        //QnA description will have a phrase to send 'Send bot 'Unlock Fuzzy'
        }
        if(message.content === "Unlock Channel"){

        const channel = bot.channels.cache.get('732757852615344139');

        
        channel.updateOverwrite(message.author,{
            VIEW_CHANNEL: true,
          })
        
          for(let i = 1; i< 4; i++){
      
        let scavWelcome = new Discord.MessageEmbed()
          .setTitle('Good Work')
          .setDescription(`Welcome ${message.author}, you placed number ${i}`)
          channel.send(scavWelcome)
        }
      }
      
    } 
    let prefix = botconfig.prefix
    let messageArray = message.content.split(" ");
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let commandfile;

    if (bot.commands.has(cmd)) {
      commandfile = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    commandfile = bot.commands.get(bot.aliases.get(cmd));
  }
  
      if (!message.content.startsWith(prefix)) return;
       
  try {
    commandfile.run(bot, message, args);
  
  } catch (e) {
  }}

  
  )})









bot.login("");
