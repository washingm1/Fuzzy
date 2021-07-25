const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow, MessageMenuOption, MessageMenu } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');

//console.log(colorRoles)

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
    let items = await db.fetch(message.author.id, { items: []});
    let user = message.guild.members.cache.get(message.author.id)




    Options = [];
    for (const x of items){

        var result = x.replace(/[<@&>]/g, '')
        let role = message.guild.roles.cache.get(result)
            console.log(role.name)
    
        Options.push(new MessageMenuOption()
            .setLabel(role.name)
            .setDescription(`Select Role to Equip`)
            .setValue(`${role.id}`)
            )

            console.log(role.id)
    }
    
     const Menu = new MessageMenu()
        .setID('Menu1')
        .setPlaceholder('Equip your roles')
        .addOptions(Options)
     
        const Row1 = new MessageActionRow()
        .addComponent(Menu)
    
        await message.channel.send("Roles", { components: [Row1] })/* .then(async message => {
            let col = message.createMenuCollector((b) => b, { time: 10000 })
            col.on('collect', (b) => {
                console.log(b.id)
                b.reply.defer()
            })
    
            col.on('end', (b) => {
                console.log('end')
        })

     
        }) */

    bot.on('clickMenu', async (menu) => {

        if(menu.values[0] == role.id){
            await menu.reply.defer()
             menu.channel.send(`You pressed the item`)
        }
}) 






/* if (args[0] == `${x.id}`) {

console.log(x.id)

if (!items.includes(`${message.guild.roles.cache.get(`${x.roleid}`)}`)){
        let rejectEmbed = new Discord.MessageEmbed()
        .setDescription('You do not own this role!');
        return message.channel.send(rejectEmbed);       
      }
      else
       if (message.member.roles.cache.some(role => role.name === x.role)) {
          let embed = new Discord.MessageEmbed().setDescription('You already have this role!');
          return message.channel.send(embed);
         }

 user.roles.remove(user.roles.highest); 

    await message.guild.members.cache.get(user.id).roles.add(x.roleid);
    let embed = new Discord.MessageEmbed().setDescription(`You now have the ${message.guild.roles.cache.get(x.roleid)} role!`);
    message.channel.send(embed);



}
 */


}

module.exports.help = {
    name: "equip2",
    description: "Equip Role",
    aliases: ["equip2"]
}
