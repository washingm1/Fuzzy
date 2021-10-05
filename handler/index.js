const { glob } = require("glob");
const { promisify } = require("util");
const { Client, Message, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {


    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));

    // Slash Commands
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];

    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

       if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        if(file.userPermissions) file.defaultPermission = false;
        arrayOfSlashCommands.push(file);
    });



 
client.on("ready", async () => {
       const guild = client.guilds.cache
       .get("646074330249429012")
        await guild.commands.set([]).then((cmd) => {
           const getRoles = (commandName) => {
               const permissions = arrayOfSlashCommands.find(
                   x => x.name === commandName
                   ).userPermissions;
                
                   if(!permissions) return null;

                   return guild.roles.cache.filter(
                       x => x.permissions.has(permissions) && !x.managed
                   );
           };

           
           const fullPermissions = cmd.reduce((accumulator, x) => {
               const roles = getRoles(x.name);
               if(!roles) return accumulator;


               const permissions = roles.reduce((a, v) => {
                   return [
                       ...a,
                       {
                           id: v.id,
                           type: 'ROLE',
                           permission: true,
                       },
                   ]
               },[]);
                    return [
                        ...accumulator,
                        {
                          id: x.id,
                          permissions,  
                        },
                    ];
           }, []);
            guild.commands.permissions.set({ fullPermissions });
       });
   

    });  
  

    client.on("messageCreate", async (message) => {
        if (message.channel.id !== "869327659526660106") return;
        if (message.author.bot) return;
        if (message.attachments.size == 0) return;
        message.react("⭐");
      });
      
      client.on("messageReactionAdd", (reaction, user) => {
        const message = reaction.message;
        const guild = client.guilds.cache
        .get("646074330249429012")
        // You could use your 👍 reaction for a neat safety check,
        // so images that were already sent to the channel don't get sent again.
        // We treat 👍 reaction as an indication that the bot has already sent the image to the specified channel.
        // This way when someone unreacts and adds the reaction back,
        // or when someone adds the reaction after it met the two upvote treshold,
        // it won't get sent again.
        if (message.reactions.cache.some(re => re.emoji.name === "👍" && re.users.cache.has(client.user.id))) {
            return;
        }
      
        let upvoteLimit = 10;
        // Number of reactions needed to be cast by the users (including the bot itself)
        // in order for the image to be sent to another channel.
      
        if (reaction.emoji.name == "⭐" && reaction.count >= upvoteLimit) {
          console.log('limit reached')
            const channel = guild.channels.cache.get("869294795019923486");

            const limitReached = new MessageEmbed()
            .setTitle(`${message.author.username} has made it to the Hall Of Fame!`)
            .addField('Image Caption', `"${message?.content}"`)
            .setColor('RANDOM')
            .setTimestamp()

  
            
            channel.send({content: `${message.author}`, embeds: [limitReached], files: [message.attachments.first()?.url] });
            message.react("👍");
        }
      
      });
      

    
client.on('messageCreate', async message =>{
  //SATURDAY SOUND THREADS
  if (message.channel.id === '732757852615344139'){
    if (message.content.includes('SATURDAY\'S SOUND') || message.content.includes('SATURDAY SOUND') || message.content.includes('Saturday\'s')){
        if(message.author.bot) return;
        const thread = await message.channel.threads.create({
            name: `${message.author.username}\'s Saturday Sound'`,
            reason: `${message.author.username} has shared an album for Saturday Sound`,
        });
    }  
}
//NEW POLL W/ THREADS
if (message.channel.id === '732757852615344139'){
  if(message.author.bot) return;
  if (message.content.includes('**')){
      const { content } = message
  const eachLine = content.split('\n')
  for (const line of eachLine){
    if (line.includes(' ')){
        const split = line.split(' ')
        const emoji = split[0].trim()
        message.react(emoji)
    }
  }
      const split = content.split('\n')
      const title = split[0].trim()
      const question = title.replace('**', '').replace('?**', '?')
      console.log(question)

      const thread = await message.startThread({
          name: `${question}`,
          reason: `${question}`,
      });          
}
}


  //POLLS
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

    //XP function
        {
          {
           xp(message)
           if(message.author.bot) return;
           var user = message.mentions.users.first() || message.author;
          var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
          var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
          var xpNeeded = level * 500 + 250 
       }
       function xp(message){
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        const randomNumber2 = Math.floor(Math.random() * 5);
        

        let author = db.fetch(`xpCool_${message.guild.id}_${message.author.id}`)
    
        let timeout = 5000;
        
        if (author !== null && timeout - (Date.now() - author) > 0) {
    
         return;
       }  db.set(`xpCool_${message.guild.id}_${message.author.id}`, Date.now())
    
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        db.add(`money_${message.guild.id}_${message.author.id}`, randomNumber2)
        db.add(`xptotal_${message.guild.id}_${message.author.id}`, randomNumber)
    
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`)
        const levelUpCreds = (level+1) * 50;
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500 + 250;
        
        if(xp > xpNeeded){
        db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
          db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
          db.add(`money_${message.guild.id}_${message.author.id}`, levelUpCreds)
          const levelUp = new MessageEmbed()
          .setTitle('Level Up!')
          .setDescription(`${message.author} Congrats! you are now level **${level + 1}**\n\n **${levelUpCreds} credits earned**!`)
          .setColor('RANDOM')
          message.reply({embeds: [levelUp] })
     
        }
       
         if (level === 50){
          message.guild.members.cache.get(message.author.id).roles.add('733062488358256750');    
        }  
       } 
        }


        })
        //Song Battle
        client.on('messageCreate', async message => {
          if(message.channel.id === '889622146538676255'){
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

    
        })
};
