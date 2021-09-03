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
       await guild.commands.set(arrayOfSlashCommands).then((cmd) => {
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
  



    
client.on('messageCreate', async message =>{
    //XP function
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
        
    
        let author = db.fetch(`xpCool_${message.guild.id}_${message.author.id}`)
    
        let timeout = 5000;
        
        if (author !== null && timeout - (Date.now() - author) > 0) {
    
         return;
       }  db.set(`xpCool_${message.guild.id}_${message.author.id}`, Date.now())
    
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber)
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        db.add(`money_${message.guild.id}_${message.author.id}`, randomNumber2)
        db.add(`xptotal_${message.guild.id}_${message.author.id}`, randomNumber)
    
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        const levelUpCreds = level * 50;
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 850 + 500;
        
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
};
