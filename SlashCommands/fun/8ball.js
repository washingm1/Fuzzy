const { Client, CommandInteraction } = require("discord.js");
        const Discord = require("discord.js");
        const db = require("quick.db");
        const { MessageActionRow, MessageButton } = require('discord.js');
        const ms = require("parse-ms");
        const Canvas = require('canvas');
        const { MessageEmbed } = require('discord.js');
        
        
        module.exports = {
            name: "8ball",
            description: "Fuzzy will predict the answer to your question",
            options: [
                {
                    name: 'question',
                    description: 'Ask a yes or no question',
                    required: true,
                    type: 'STRING',
                },
            ],
           
            /**
             *
             * @param {Client} client
             * @param {CommandInteraction} interaction
             * @param {String[]} args
             */
        
        
        
        run: async (client, interaction, args, message) => {
            console.log(interaction)
                await interaction.deferReply({ ephemeral: false }).catch(() => {});
                let user = interaction.options.getUser('youruseroption') || interaction.user
                const guild = client.guilds.cache.get("646074330249429012");
        
                const [question] = args
        
                let replies = ['It is Certain.', 
                'It is decidedly so',
                 'Without a doubt', 
                 'Yes definitely', 
                 'You may rely on it',
                 'Most Likely',
                 'Yes',
                 'Unsure, ask again later',
                 'I shouldn\'t tell you',
                 'Don\'t count on it',
                 'My reply is no',
                 'Signs point to no',
                 'Very doubtful',
            
            ]

         
            let result = Math.floor((Math.random() * replies.length));
        
        
                let embed1 = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${question}`)
                .setDescription(`Fuzzy says: \`${replies[result]}\``);
                interaction.editReply({ embeds: [embed1]})
        
        
        
        },
        };
