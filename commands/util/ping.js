const { MessageEmbed } = require('discord.js')
 
module.exports = {
  slash: 'both',
  testOnly: true,
  description: 'creates poll',
  minArgs: 3,
  expectedArgs: '<title> <choice1> <choice2> [choice3] [choice4]',
  callback: ({ message, args }) => {
    const embed = new MessageEmbed()
 
    const [title, choice1, choice2, choice3, choice4] = args
 
    embed.setColor('RANDOM')
    embed.setTitle(title, '\u200b')
    embed.addField('\u200b', choice1)
    embed.addField('\u200b', choice2)
    if (choice3) embed.addField('\u200b', choice3)
    if (choice4) embed.addField('\u200b', choice4)
    embed.setTimestamp(new Date);
 
    if (message) {
      message.reply('', { embed })
    }
 
    return embed
  },
}

module.exports.help = {
    name:"ping",
    aliases: ["ping"]
  }

