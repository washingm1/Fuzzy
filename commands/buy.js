const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
   
    if(!message.content.startsWith('!'))return; 
    let user = message.author;
    let amount = db.fetch(`money_${message.guild.id}_${user.id}`)

   
if (!args[0]){
    message.channel.send('Please enter a valid role to buy!')
}

if(args[0] == 'vinyl') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 50,000 coins to purchase ${message.guild.roles.cache.get('734961500636315799')}`);

    let vinyl = await db.fetch(`vinyl_${message.guild.id}_${user.id}`)
    
    if (vinyl > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 50000){ return message.channel.send(Embed2)}
   
    db.fetch(`vinyl_${message.guild.id}_${user.id}`)
    db.add(`vinyl_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('734961500636315799')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('734961500636315799')} For 10000 Credits!`);

    await message.guild.members.cache.get(user.id).roles.add('734961500636315799');
    
    db.subtract(`money_${message.guild.id}_${user.id}`, 50000)
    message.channel.send(Embed3)
}

if(args[0] == 'stacks') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 100,000 coins to purchase ${message.guild.roles.cache.get('734957985939325009')}`);

    let stacks = await db.fetch(`stacks_${message.guild.id}_${user.id}`)
    
    if (stacks > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 100000){ return message.channel.send(Embed2)}
   
    db.fetch(`stacks_${message.guild.id}_${user.id}`)
    db.add(`stacks_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('734957985939325009')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('734957985939325009')} For 100000 Credits!`);

    await message.guild.members.cache.get(user.id).roles.add('734957985939325009');

    db.subtract(`money_${message.guild.id}_${user.id}`, 100000)
    message.channel.send(Embed3)
}




 if(args[0] == 'tan') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813153522760679444')}`);

    let tann = await db.fetch(`tan_${message.guild.id}_${user.id}`)
    
    if (tann > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`tan_${message.guild.id}_${user.id}`)
    db.add(`tan_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813153522760679444')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813153522760679444')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}


if(args[0] == 'brown') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813152691965657170')}`);

    let dbrown = await db.fetch(`dbrown_${message.guild.id}_${user.id}`)
    
    if (dbrown > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`dbrown_${message.guild.id}_${user.id}`)
    db.add(`dbrown_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813152691965657170')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813152691965657170')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}


if(args[0] == 'olive') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813153820112453662')}`);

    let olive = await db.fetch(`olive_${message.guild.id}_${user.id}`)
    
    if (olive > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`olive_${message.guild.id}_${user.id}`)
    db.add(`olive_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813153820112453662')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813153820112453662')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}

if(args[0] == 'redclay') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813162086149914664')}`);

    let rclay = await db.fetch(`rclay_${message.guild.id}_${user.id}`)
    
    if (rclay > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`rclay_${message.guild.id}_${user.id}`)
    db.add(`rclay_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813162086149914664')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813162086149914664')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}


if(args[0] == 'lightbrown') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813153670467944459')}`);

    let lbrown = await db.fetch(`lbrown_${message.guild.id}_${user.id}`)
    
    if (lbrown > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`lbrown_${message.guild.id}_${user.id}`)
    db.add(`lbrown_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813153670467944459')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813153670467944459')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}

if(args[0] == 'clay') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813152807720583180')}`);

    let clay = await db.fetch(`clay_${message.guild.id}_${user.id}`)
    
    if (clay > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`clay_${message.guild.id}_${user.id}`)
    db.add(`clay_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813152807720583180')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813152807720583180')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}


if(args[0] == 'turquoise') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 10,000 coins to purchase ${message.guild.roles.cache.get('813152038346817597')}`);

    let turquoise = await db.fetch(`turquoise_${message.guild.id}_${user.id}`)
    
    if (turquoise > 0){ return message.channel.send('You already own this role!')

 
    }else

    if (amount < 10000){ return message.channel.send(Embed2)}
   
    db.fetch(`turquoise_${message.guild.id}_${user.id}`)
    db.add(`turquoise_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('813152038346817597')}`)
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('813152038346817597')} For 10000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 10000)
    message.channel.send(Embed3)
}



    //MEDICINE MAROON (GOOD TO GO!!)
    if(args[0] == 'maroon') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('840291911138017290')}`);
    

        let maroon = await db.fetch(`maroon_${message.guild.id}_${user.id}`)
       
        if (maroon > 0){ return message.channel.send('You already own this role!')
    
        }else

        if (amount < 25000){return message.channel.send(Embed2)}
       
        db.fetch(`maroon_${message.guild.id}_${user.id}`)
        db.add(`maroon_${message.guild.id}_${user.id}`, 1)
       
        db.push(message.author.id, `${message.guild.roles.cache.get('840291911138017290')}`);
        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('840291911138017290')} For 25,000 Credits!`);
    
        db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
        message.channel.send(Embed3)
    }
    
    


    //HOT ROD RED (GOOD TO GO!!)
    if(args[0] == 'red') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733373020491481219')}`);
    

        let redd = await db.fetch(`red_${message.guild.id}_${user.id}`)
       
        if (redd > 0){ return message.channel.send('You already own this role!')
    
        }else

        if (amount < 25000){return message.channel.send(Embed2)}
       
        db.fetch(`red_${message.guild.id}_${user.id}`)
        db.add(`red_${message.guild.id}_${user.id}`, 1)
       
        db.push(message.author.id, `${message.guild.roles.cache.get('733373020491481219')}`);
        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733373020491481219')} For 25,000 Credits!`);
    
        db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
        message.channel.send(Embed3)
    }
    
    


//CAN I GOLD YOU TONIGHT? 733372122138673242
if(args[0] == 'gold') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733372122138673242')}`);


    let goldd = await db.fetch(`gold_${message.guild.id}_${user.id}`)
   
    if (goldd > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`gold_${message.guild.id}_${user.id}`)
    db.add(`gold_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733372122138673242')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733372122138673242')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}




if(args[0] == 'mint') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('848944213382266890')}`);


    let mint = await db.fetch(`mint_${message.guild.id}_${user.id}`)
   
    if (mint > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`mint_${message.guild.id}_${user.id}`)
    db.add(`mint_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('848944213382266890')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('848944213382266890')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}






//FALSE DIRECTION DANDELION 733375824140435546
if(args[0] == 'dandelion') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733375824140435546')}`);


    let dande= await db.fetch(`dandelion_${message.guild.id}_${user.id}`)
   
    if (dande > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`dandelion_${message.guild.id}_${user.id}`)
    db.add(`dandelion_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733375824140435546')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733375824140435546')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}


    //DECEMBER GREEN (GOOD TO GO!!)
    if(args[0] == 'december') {
        let Embed2 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('840293431686725634')}`);
    

        let december = await db.fetch(`december_${message.guild.id}_${user.id}`)
       
        if (december > 0){ return message.channel.send('You already own this role!')
    
        }else

        if (amount < 25000){return message.channel.send(Embed2)}
       
        db.fetch(`december_${message.guild.id}_${user.id}`)
        db.add(`december_${message.guild.id}_${user.id}`, 1)
       
        db.push(message.author.id, `${message.guild.roles.cache.get('840293431686725634')}`);
        let Embed3 = new Discord.MessageEmbed()
        .setColor("#FFFFFF")
        .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('840293431686725634')} For 25,000 Credits!`);
    
        db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
        message.channel.send(Embed3)
    }


        //LIKE IVY (GOOD TO GO!!)
        if(args[0] == 'ivy') {
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('840292885823488041')}`);
        
    
            let ivy = await db.fetch(`ivy_${message.guild.id}_${user.id}`)
           
            if (ivy > 0){ return message.channel.send('You already own this role!')
        
            }else
    
            if (amount < 25000){return message.channel.send(Embed2)}
           
            db.fetch(`ivy_${message.guild.id}_${user.id}`)
            db.add(`ivy_${message.guild.id}_${user.id}`, 1)
           
            db.push(message.author.id, `${message.guild.roles.cache.get('840292885823488041')}`);
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('840292885823488041')} For 25,000 Credits!`);
        
            db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
            message.channel.send(Embed3)
        }


//LISTERINE BLUE 733373200830038028

if(args[0] == 'listerine') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733373200830038028')}`);


    let listerinee = await db.fetch(`listerine_${message.guild.id}_${user.id}`)
   
    if (listerinee > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`listerine_${message.guild.id}_${user.id}`)
    db.add(`listerine_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733373200830038028')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733373200830038028')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}


        //INTO BLUE (GOOD TO GO!!)
        if(args[0] == 'iblue') {
            let Embed2 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('840291584170917940')}`);
        
    
            let iblue = await db.fetch(`iblue_${message.guild.id}_${user.id}`)
           
            if (iblue > 0){ return message.channel.send('You already own this role!')
        
            }else
    
            if (amount < 25000){return message.channel.send(Embed2)}
           
            db.fetch(`iblue_${message.guild.id}_${user.id}`)
            db.add(`iblue_${message.guild.id}_${user.id}`, 1)
           
            db.push(message.author.id, `${message.guild.roles.cache.get('840291584170917940')}`);
            let Embed3 = new Discord.MessageEmbed()
            .setColor("#FFFFFF")
            .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('840291584170917940')} For 25,000 Credits!`);
        
            db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
            message.channel.send(Embed3)
        }


//SOMETHING SAPPHIRE 817577875376177212

if(args[0] == 'sapphire') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('817577875376177212')}`);


    let sapphiree = await db.fetch(`sapphire_${message.guild.id}_${user.id}`)
   
    if (sapphiree > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`sapphire_${message.guild.id}_${user.id}`)
    db.add(`sapphire_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('817577875376177212')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('817577875376177212')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}



//DEAR FRIEND PINK 733373552333553674

if(args[0] == 'pink') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733373552333553674')}`);


    let pinkk = await db.fetch(`pink_${message.guild.id}_${user.id}`)
   
    if (pinkk > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`pink_${message.guild.id}_${user.id}`)
    db.add(`pink_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733373552333553674')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733373552333553674')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}



//CLOSE TO YOU CORAL 798570476657442868
if(args[0] == 'coral') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('798570476657442868')}`);


    let corall = await db.fetch(`coral_${message.guild.id}_${user.id}`)
   
    if (corall > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`coral_${message.guild.id}_${user.id}`)
    db.add(`coral_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('798570476657442868')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('798570476657442868')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}




//JUNIOR VARSITY VIOLET 733374862499774626

if(args[0] == 'violet') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733374862499774626')}`);


    let violett = await db.fetch(`violet_${message.guild.id}_${user.id}`)
   
    if (violett > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`violet_${message.guild.id}_${user.id}`)
    db.add(`violet_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733374862499774626')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733374862499774626')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}




//NICKNAMES PEACH 733374371304833037

if(args[0] == 'peach') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733374371304833037')}`);


    let peachh = await db.fetch(`peach_${message.guild.id}_${user.id}`)
   
    if (peachh > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`peach_${message.guild.id}_${user.id}`)
    db.add(`peach_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733374371304833037')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733374371304833037')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}




//DAYGLOW BLACK 

if(args[0] == 'black') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733376143742205992')}`);


    let blackk = await db.fetch(`black_${message.guild.id}_${user.id}`)
   
    if (blackk > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`black_${message.guild.id}_${user.id}`)
    db.add(`black_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733376143742205992')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733376143742205992')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}






//FAIR GAME GREY 

if(args[0] == 'grey') {
    let Embed2 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription( `:x: You need 25,000 coins to purchase ${message.guild.roles.cache.get('733373771691327488')}`);


    let greyy = await db.fetch(`grey_${message.guild.id}_${user.id}`)
   
    if (greyy > 0){ return message.channel.send('You already own this role!')

    }else

    if (amount < 25000){return message.channel.send(Embed2)}
   
    db.fetch(`grey_${message.guild.id}_${user.id}`)
    db.add(`grey_${message.guild.id}_${user.id}`, 1)
   
    db.push(message.author.id, `${message.guild.roles.cache.get('733373771691327488')}`);
    let Embed3 = new Discord.MessageEmbed()
    .setColor("#FFFFFF")
    .setDescription(`:white_check_mark: Purchased ${message.guild.roles.cache.get('733373771691327488')} For 25,000 Credits!`);

    db.subtract(`money_${message.guild.id}_${user.id}`, 25000)
    message.channel.send(Embed3)
}


}
  
  module.exports.help = {
    name:"buy",
    aliases: [""]
  }