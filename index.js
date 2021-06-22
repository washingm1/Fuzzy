const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const prefix="!";
const db = require('quick.db');
const Canvacord = require('canvacord');
const client = new Discord.Client(); 
const { Slash } = require('discord-slash-commands');
const { profile, time } = require("console");
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

    bot.counter = 0;
bot.maxCount = 3;



  bot.on("message", async message => {
    if(message.author.bot) return;

 
  
if(message.channel.id === '845488614753304596'){
    const { content } = message
    const eachLine = content.split('\n')
    for (const line of eachLine){
      if (line.includes(' ')){
          const split = line.split(' ')
          const emoji = split[0].trim()
          message.react(emoji)
      }
    }
  };


//SCAVENGER HUNT CODE

let guildID = '646074330249429012'

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
      
const channel = bot.channels.cache.get('856587120789028885');
const channel2 = bot.channels.cache.get('739954713818300456');

          if (message.content === 'Unlock Channel') {
        
             channel.updateOverwrite(message.author,{
                 VIEW_CHANNEL: true
             })    
           
             let scavWelcome = new Discord.MessageEmbed()
             .setTitle('Almost There!')
             .setDescription(`Welcome ${message.author}! \n\nFor your final step, name this song\n\n **Send the title to ${bot.user}, please capitalize the first letter of the song name!**`)
             .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
             .setColor('RANDOM')
          channel.send(scavWelcome);
          channel.send(`${message.author}`);
          }

          if (message.content === 'December'){
            
            if (bot.counter === bot.maxCount){
              bot.counter = 0
              return message.author.send('**Good Try!**\n\n Maximum winners reached, almost had it!')
            }
            else bot.counter++;
              let scavFinish = new Discord.MessageEmbed()
              .setTitle('Congratulations!')
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`**Congrats ${message.author}! You have completed the Scavenger hunt, you placed number ${bot.counter}!**`)
              .addField('Rewards', `For your reward, you now have a color customizeable role, and credits!`)
              .addField('1st Place', '15,000 Credits')
              .addField('2nd Place', '10,000 Credits')
              .addField('3rd Place', '7,500 Credits')
              .setColor('RANDOM')
              message.author.send(scavFinish)
             channel2.send(`${message.author} placed #${bot.counter}\n\n Author ID: ${message.author.id}`)
          }

      
    } ;

//END SCAVENGER HUNT CODE


    {
      {
       xp(message)
       if(message.author.bot) return;
       var user = message.mentions.users.first() || message.author;
      var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
      var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
      var xpNeeded = level * 500 + 500 

   }
  
   
   function xp(message){
     if(message.author.bot) return
     const randomNumber = Math.floor(Math.random() * 10) + 15;
     const randomNumber2 = Math.floor(Math.random() * 5);
     db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
     db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)

     db.add(`money_${message.guild.id}_${message.author.id}`, randomNumber2)

     var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
     var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
     var xpNeeded = level * 500;
     if(xpNeeded < xp){
       var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
       db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
       message.channel.send(`${message.author}, you are now level ${newLevel}!`)
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

