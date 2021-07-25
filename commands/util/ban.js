const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");



module.exports = {
    name: "ban",
    description: "Ban user",
    expectedArgs: "<user:6:select user>",
    userRequiredPermissions: "BAN_MEMBERS",
    clientRequiredPermissions: "BAN_MEMBERS",
    minArgs: 1,
    run: async({client, interaction, respond}, arrayArgs, args) => {
        var userId = arrayArgs[0]
        var guild = client.guilds.cache.find(guild => guild.id === slash.guild_id)
        var member = guild.members.cache.find(member => member.id === userId.replace(/[!@<>]/g, ''));

        member.ban({reason:"goodbye"});
        respond(`User <@${member.id}> banned.`)
  }
};

module.exports.help = {
  name:"ban",
  aliases: ["ban"]
}