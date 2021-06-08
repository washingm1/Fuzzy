const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {
let timeuser = args[0]
let reason = args.slice(1).join(" ")


if(!timeuser) return message.reply(":x: Please enter a valid time")


db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
message.channel.send(`**Reminder set for:** ${timeuser}`)
const interval = setInterval(function() {


    if(Date.now() > db.fetch(`remind.${message.author.id}`)){
        db.delete(`remind.${message.author.id}`)
        message.author.send(`**You are being reminded for: **${message.content}`)
        .catch(e => console.log(e))
        clearInterval(interval)
    }

},1000)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["r"]
}

module.exports.help = {
    name:"remind",
    aliases: ["rem"]
}