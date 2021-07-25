const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {

    let pages = [
        'This is our first page...',
        '...this is our second...',
        '..and this is our third!'];
    
    // We'll now create a place to store the current page number...
    let current = 0;
    
    // ...and will now post a loading message which we will edit later.
    let m = await message.channel.send('Loading pages...');
    
    // We'll now create a function to create embed pages.
    function createEmbed (page) {
        // We'll just make the embed and return it.
        let embed = new Discord.MessageEmbed()
        .setDescription(pages[page]);
        return embed;
    };
    
    // We'll also create another function to determine whether we need to show reactions.
    function reactionsNeeded (page) {
        // We'll now return an ARRAY with the results.
        // The first element will be backwards, second will be forwards.
        return [
            pages[page - 1],
            pages[page + 1]
        ];
    };
    
    // Next, we'll make another function which will be used to show pages.
    async function showPage (page) {
        // We'll quickly use our createEmbed function to get the page we need...
        let output = createEmbed(page);
        
        // ...and then we'll edit our original message with the new embed.
        // We set the message content to NULL to remove the original loading message and then attach our embed to the message.
        await m.edit(null, { embed: output });
        
        // To make sure our reaction system works, we'll remove all previous reactions, if there is any.
        await m.reactions.removeAll();
        
        // We'll create a couple variables to store our reaction listeners in and our reactionNeeded result.
        let needed = reactionsNeeded(page);
        let left, right;
        
        // If we actually need to add a backwards reaction, we will.
        if (needed[0]) {
            // As it's needed, we'll add the reaction.
            await m.react('⬅️');
            
            // We'll quickly create a reaction collector filter so we only collect the right events...
            let filter = (r, u) => r.emoji.name == '⬅️' && u.id == message.author.id;
            
            // ...and then set the variable we made earlier. We'll make sure our collector times out after 60,000ms (60 seconds).
            left = m.createReactionCollector(filter, { time: 60000 });
            
            // We'll now handle the add reaction event.
            left.on('collect', r => {
                // We'll stop listening for any more reactions here...
                if (right) right.stop();
                left.stop();
                
                // ...and will then show the new page and update the current page.
                showPage(current - 1);
                current = current - 1;
            });
        };
        
        // We'll now do that again for the other reaction. Only minor changes are made.
        if (needed[1]) {
            await m.react('➡️');
            
            let filter = (r, u) => r.emoji.name == '➡️' && u.id == message.author.id;
            right = m.createReactionCollector(filter, { time: 60000 });
            
            right.on('collect', r => {
                if (left) left.stop();
                right.stop();
                
                showPage(current + 1);
                current = current + 1;
            });
        };
    };
    
    // Now we've done that, we will now create our page system.
    showPage(current);
};










module.exports.help = {
  name:"pages",
  aliases: ["pro"]
}
