const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {
    if(!args.length || isNaN(args[0]) || parseInt(args[0]) > 100 || parseInt(args[0]) < 0) return message.channel.send('Please provide correct parameter');
const messages = await message.channel.messages.fetch({ limit: parseInt(args[0]) });
const usable = messages.filter((m) => (m.createdTimestamp - Date.now())< ms ('14d') && !m.pinned);

await message.delete();
await message.channel.bulkDelete(usable);






}



module.exports.help = {
  name:"purge",
  aliases: ["purge"]
}






