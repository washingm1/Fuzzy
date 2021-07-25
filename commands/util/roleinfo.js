const { MessageEmbed, Permissions } = require('discord.js');




module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('!'))return;  
        // code starts here
        try {
    const roleName = message.guild.roles.cache.find(r => (r.name === args.toString()) || (r.id === args.toString()) || (r.name === args.slice()) || (r.name === args.join(' ')))
           
             // Take every element from index 1 to the end
           
          //  console.log(roleName)
            const perms = new Permissions(roleName.permissions.bitfield).toArray()

            const embed = new MessageEmbed()
                .setColor(roleName.color)
                .setTitle(roleName.name)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .addFields(
                    {
                        name: 'Role ID: ',
                        value: roleName.id,
                        inline: true
                    },
                    {
                        name: 'Role Name: ',
                        value: roleName.name,
                        inline: true
                    },
                    {
                        name: 'Mentionable: ',
                        value: roleName.mentionable ? 'Yes' : 'No',
                        inline: true
                    },
                    {
                        name: 'Role Permissions: ',
                        value: perms.join(', ')
                    },
                    {
                        name: 'Created At:',
                        value: roleName.createdAt,
                        inline: true
                    },
                    {
                        name: 'Number of Users',
                        value: roleName.members.size
                    },
                    {
                        name: 'Preview',
                        value:  `${message.guild.roles.cache.get(roleName.id)}`,
                        inline: true
                    }
                )

            await message.channel.send(embed)

        } catch (e) {
            return message.channel.send('Role Doesn\'t Exist').then(() => console.log(e))
        }

    }

module.exports.help = {
    name:"roleinfo",
    aliases: ["roleinfo"]
  }
  
  
  