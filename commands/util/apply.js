const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");



module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return; 

    let staffDocs = db.add(`staffConfirm_${message.author.id}`, 1);
    

    
        const questions = [
            "You are currently applying for the 'helper' role!! Helpers are members of the community that show initiative to continue improving different features of the server! Things such as coming up with ideas for events, helping out & engaging in conversation with new members, and keeping the chat neat are all things that Helpers can do! Although not required at all, helpers should try to be fairly active. This doesn't mean 24/7, or even an hour, just enough to help out with something if needed! **Type 'continue'** to move on to the first question",
            "**1.** To start off, **Simply type in your username, along with the discriminator** (The four numbers at the end of your name; Ex. Username#1234)",
            "**2. When did you join the server?** If you're unsure, use *`!userinfo`* back in #commands.",
            "**3.** Thank you! Next, **What time zone are you located in?** This is to get a general idea of who will be online, and when.",
            "**4.** When you first joined the server, **What was your first impression?** Was there anything that could've been different?",
            "**5. Have you read over the general staff rules?** Just reply with 'yes' if you have. If not, I highly recommend you take a look at it!",
            "**6.** Let's say someone joins the server, and overall is being a fairly person. All of a sudden, they start sending inaproppriate media/messages that are borderline NSFW. **What should you do?** No right answers, just say whatever you think is the best solution!",
            "**7. What would you do to overall improve the server?** Although not required, throw some ideas down here!",
            "**8. Do you have any other experience being staff on other Discord servers?** If so, what were they? (This is not a requirement)",
            "**9.** If you were not to get the staff position, **Who would you recommend for staff?** It can be one person, multiple people, or none if you don't have any recommendations",
            "**Thank you! You've reached the end of the application! *To submit it, simply respond to this message with 'Submit'.***"
        ];

    const dmChannel = await message.author.send('Welcome to your application!\nhttps://media.discordapp.net/attachments/511356947174260746/864976179463061561/staffApps.png');
    const collector = dmChannel.channel.createMessageCollector((msg) => msg.author.id == message.author.id);
    console.log(message.author)
    let i = 0;
    const res = [];
    dmChannel.channel.send(questions[0])
    
    collector.on('collect', async(msg) => {
            if(questions.length == i) return collector.stop('MAX');
            const answer = msg.content;
        res.push({ question: questions[i], answer });
        i++;
        if (questions.length == i) return collector.stop('MAX');
        else {
            dmChannel.channel.send(questions[i]);
        }
    });
collector.on('end', async (collected, reason) => {
    if(reason == 'MAX'){
          const data =  message.guild.channels.cache.find(ch => ch.name.toLowerCase() == 'test' && ch.type == 'text');

          data.send(
          new Discord.MessageEmbed()

          .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
          .setTitle(`${message.author}(${message.author.tag}) submitted a staff application`)
        .setDescription(`${res.map(d => `**${d.question}** \n- ${d.answer}`).join("\n\n")}`)
        .setTimestamp()
        .setColor('RANDOM')
          )
    }
})
}

module.exports.help = {
  name:"apply",
  aliases: ["ap"]
}