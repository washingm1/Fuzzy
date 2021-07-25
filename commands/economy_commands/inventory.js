const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 
{
        let items = await db.fetch(message.author.id);
        if(items === null) items = "Nothing";
        console.log(message.author.id)
        console.log(items)
        const Embed = new Discord.MessageEmbed()
            .addField('Inventory', items)
            .setColor('RANDOM')
            .setTitle('Owned Items: ')
            message.channel.send(Embed)

    }


}




    module.exports.help = {
        name: "inventory",
        description: "View inventory",
        aliases: ["inv"]
    }