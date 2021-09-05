const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu,} = require("discord.js");
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);


module.exports = {
    name: "help",
    description: "View all commands and how to use them",
   
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */



run: async (client, interaction, args, message) => {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});
    const guild = client.guilds.cache.get("646074330249429012");


    //Economy Commands
    const econCommands = await globPromise(
        `${process.cwd()}/SlashCommands/economy/*.js`
    );
    const econArray = [];
    econCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        econArray.push(`\`${ file.name[0].toUpperCase() + file.name.substring(1)}\``);  
    });
    const econDesc = await globPromise(
        `${process.cwd()}/SlashCommands/economy/*.js`
    );
    const econDescArray = [];

    econDesc.map((value) => {
        const file = require(value);
        if(!file?.name) return;
        econDescArray.push(`*${file.description[0].toUpperCase() + file.description.substring(1)}*`)
    })
    const embed = new MessageEmbed()
    .setTitle('Economy Commands')

    for (let i=0; i < econArray.length; i++)(embed.addField(econArray[i], `${econDescArray[i]}`, true))
    


    //Utility Commands
    const utilCommands = await globPromise(
        `${process.cwd()}/SlashCommands/utility/*.js`
    );
    const utilArray = [];
    utilCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        utilArray.push(`\`${ file.name[0].toUpperCase() + file.name.substring(1)}\``);
    });
    const utilDesc = await globPromise(
        `${process.cwd()}/SlashCommands/utility/*.js`
    );
    const utilDescArray = [];
    utilDesc.map((value) => {
        const file = require(value);
        if(!file?.name) return;
        utilDescArray.push(`*${file.description[0].toUpperCase() + file.description.substring(1)}*`)
    })
    const embed2 = new MessageEmbed()
    .setTitle('Utility Commands')
    for (let i=0; i < utilArray.length; i++)(embed2.addField(utilArray[i], `${utilDescArray[i]}`, true))




    //Fun Commands
    const funCommands = await globPromise(
        `${process.cwd()}/SlashCommands/fun/*.js`
    );
    const funArray = [];
    funCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        funArray.push(`\`${ file.name[0].toUpperCase() + file.name.substring(1)}\``);
    });
    const funDesc = await globPromise(
        `${process.cwd()}/SlashCommands/fun/*.js`
    );
    const funDescArray = [];
    funDesc.map((value) => {
        const file = require(value);
        if(!file?.name) return;
        funDescArray.push(`*${file.description[0].toUpperCase() + file.description.substring(1)}*`)
    })
    const embed3 = new MessageEmbed()
    .setTitle('Utility Commands')
    for (let i=0; i < funArray.length; i++)(embed3.addField(funArray[i], `${funDescArray[i]}`, true))



const rulesChan = guild.channels.cache.find(ch => ch.name === 'rules');

    //Info
    const embed4 = new MessageEmbed()
    .setTitle('Info')
    .addField('XP System', 'For every message sent, you get a random amount of XP between 0 and 15, as well as up to 5 credits. Upon leveling up, you will receive a number of credits, which will increase every level.' )
   .addField('Roles', 'Color roles (\`/shop\`) are earnable through chatting, and gaining credits. Each role has a required amount of credits, as well as levels needed to purchase it. Some roles are free to obtain, which can be found by using the \`/selfrole\` slash command!')
    .addField('Support', 'Have a suggestion to make the server an overall better place? Or are you having issues with another member? The \`/suggest\` and \`/report\` commands make it easier for users to communicate with server staff, and report anything they would like to see changed. Have something more urgent to say? Feel free to dm any staff member directly')
    .addField('Bugs/Errors', 'If you encounter any bugs or glitches in the bot, or something isn\'t working properly, feel free to DM/ping in chat @ADoorMatt for assistance')
    .addField('Directions', `Lost your way around the server? To get started, visit ${rulesChan} for help navigating the server.`)
    

    

     interaction.editReply({ embeds: [ embed, embed2, embed3, embed4] }) 













},
};
