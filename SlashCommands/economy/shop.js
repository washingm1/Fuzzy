const { Client, CommandInteraction, MessageEmbed, Message, ButtonInteraction } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const db = require("quick.db");
const Canvas = require('canvas');
const { guildRoles } = require("../arrays/roles_array");
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: "shop",
    description: "Buy & sell color roles!",

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    
run: async (client, interaction, args, message) => {  
  let user = interaction.options.getUser('youruseroption') || interaction.user
  const guild = client.guilds.cache.get("646074330249429012");
  await interaction.deferReply({ ephemeral: true });
    
  //Making sure we're in the commands channel
  let cmdChannel = interaction.guild.channels.cache.get("733043770454704189")
  let returnEmbed = new MessageEmbed()
  .setTitle('Oops!')
  .setDescription(`Please use ${cmdChannel} for any bot commands`)
/*   if (interaction.channel !== cmdChannel) return interaction.followUp({ embeds: [returnEmbed] }); */

  //Let user know their stats inside the shop
  var showLevel =  db.fetch(`guild_${guild.id}_level_${user.id}`) || 0;
  var showAmount =  db.fetch(`money_${guild.id}_${user.id}`)
  let items =  db.fetch(user.id, { items: []});
  if(items === null) items = "Nothing";
 console.log(interaction.id)

  //Shop Home
  let shopHome = new MessageEmbed()
  .setTitle('Harmony House Role Shop')
  .setDescription('**Welcome to the Harmony House Role Shop!**\n\n __**How To Use**__\n To navigate around, please choose the appropriate button to take you to a shop section. When you find the role you would like to buy, select the \`Buy Role\` Button, you will then be asked to confirm the purchase! \n\nIf you would like to sell an owned role, navigate to that page and select \`Sell Role\`.\n **NOTE:** You will only receive 75% back from the paid amount\n\n  \nShop will timeout automatically in Five minutes. ')
  .setColor('#CB33FF')
  .addField('Your Level', `\`${showLevel}\``)
  .addField('Your Balance', `\`${showAmount}\``)
  .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
  .setImage('https://media.discordapp.net/attachments/732757852615344139/894625763586883654/roleshopbanner.png')


//MAIN MENU BUTTONS
const roleNav = new MessageActionRow()
.addComponents(
  new MessageButton()
  .setCustomId('lvl5')
  .setLabel('Level 5 Roles')
  .setStyle('PRIMARY')
,
  new MessageButton()
  .setCustomId('lvl10')
  .setLabel('Level 10 Roles')
  .setStyle('PRIMARY')
,
 new MessageButton()
 .setCustomId('lvl20')
 .setLabel('Level 20 Roles')
 .setStyle('PRIMARY')
);

const roleNav2 = new MessageActionRow()
.addComponents(
 new MessageButton()
 .setCustomId('lvl50')
 .setLabel('Level 50 Roles')
 .setStyle('PRIMARY')
 ,
new MessageButton()
.setCustomId('extras')
.setLabel('Extras')
.setStyle('PRIMARY') 
,
new MessageButton()
.setCustomId('seasonal')
.setLabel('Seasonal')
.setStyle('PRIMARY')
)
    //Creating the array to make embeds for each role
    var embeds = [ ]
    for(const x of guildRoles)embeds.push(new MessageEmbed()
    .setDescription(`**Your Level:** \`${showLevel}\`\n\n**Your Balance:**\`${showAmount}\``)
     .setColor(x.color)
     .setTitle(`${x.role}`)
     .addField('Available At:', `Level ${x.availAt}`)
     .addField('Cost',  `${x.price}`)
     .addField('Hex Code', `${x.color}`)
     .addField('Role Preview', `${interaction.guild.roles.cache.get(`${x.roleid}`)}`)
     .setFooter('NOTE: Selling a role only gives you 75% of your credits back')
     .setThumbnail(`${x.thumbnail}`)
     )


//Arrays to check the parameters for each role

//The level required to buy role
var roleLevel = []
for(const x of guildRoles)roleLevel.push(
x.availAt
)
//The role's ID
var roleChecks = []
for(const y of guildRoles)roleChecks.push(
y.roleid,
)
//The Role's price
var rolePrices = []
for(const z of guildRoles)rolePrices.push(
  z.price
)
//Plain Text Role Name
var roleName = []
for(const n of guildRoles)roleName.push(
  n.role
)

//NAVIGATION BUTTONS
//Back, home, Next, Buy & Sell buttons
const row = new MessageActionRow() 
.addComponents(
  new MessageButton()
  .setCustomId('prev')
  .setLabel('Back')
  .setStyle('PRIMARY')
,
new MessageButton()
.setCustomId('home')
.setLabel('Home')
 .setStyle('SECONDARY')
,
  new MessageButton()
    .setCustomId('next')
    .setLabel('Next')
    .setStyle('PRIMARY')
,
  new MessageButton()
    .setCustomId('buy')
    .setLabel('Buy Role')
    .setStyle('SUCCESS')
,
   new MessageButton()
  .setCustomId('sell')
  .setLabel('Sell Role')
  .setStyle('DANGER') 
    )


  const row2 = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setCustomId('exit')
    .setLabel('Exit Shop')
    .setStyle('DANGER')
  )


//Yes Or No Buttons
const options = new MessageActionRow() 
.addComponents(
  new MessageButton()
  .setCustomId('buyIt')
  .setLabel('Confirm Purchase')
  .setStyle('SUCCESS')
,
new MessageButton()
.setCustomId('cancel')
.setLabel('Cancel')
 .setStyle('DANGER')
    )

    interaction.editReply({
      embeds: [shopHome],
      components: [roleNav, roleNav2],
    });
    
     //ERROR BUTTON, when the Buy button/Sell button is clicked, and the user is not eligible for that action
 const goBack = new MessageActionRow() 
 .addComponents(
   new MessageButton()
   .setCustomId('goBack')
   .setLabel('Go Back')
   .setStyle('DANGER')
     )

    //Define Collector
    const shopCollector = interaction.channel.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 100000,
    });


    let currentPage = 0;





//Start the button collector
  shopCollector.on('collect', async (ButtonInteraction) => {
if (ButtonInteraction.user.id !== interaction.user.id) return;
      const id = ButtonInteraction.customId;
  console.log(id)
  console.log(ButtonInteraction.message.id)

  let verifyShop = ButtonInteraction.message.id;




  //Navigation to certain level roles
    if (id === 'lvl5') {
  currentPage = 0;
  ButtonInteraction.deferUpdate()
  interaction.editReply({embeds: [embeds[currentPage]], components: [row, row2] })
      }
   else if (id === 'lvl10') {
        currentPage = 7;
        ButtonInteraction.deferUpdate()
           console.log(`Button msg id was ${ButtonInteraction.message.id}, while the msg id was ${verifyShop}`)
        interaction.editReply({embeds: [embeds[7]], components: [row, row2] })
      }
    else if (id === 'lvl20') {
        currentPage = 13;
        ButtonInteraction.deferUpdate()
        interaction.editReply({embeds: [embeds[13]], components: [row, row2] })
      }
    else if (id === 'lvl50') {
        currentPage = 23;
        ButtonInteraction.deferUpdate()
        interaction.editReply({embeds: [embeds[23]], components: [row, row2] })
      }
       else if (id === 'extras') {
        currentPage = 30;
        ButtonInteraction.deferUpdate()
        interaction.editReply({embeds: [embeds[30]], components: [row, row2] })
      }
      else if (id === 'seasonal') {
        currentPage = 33;
        ButtonInteraction.deferUpdate()
        interaction.editReply({embeds: [embeds[33]], components: [row, row2] })
      }
 

//Previous page
else if(id === "prev") {
  ButtonInteraction.deferUpdate()
  if (currentPage !== 0) {
      --currentPage;
  
      interaction.editReply({ embeds: [embeds[currentPage]], components: [row, row2]})
} else {
      currentPage = 0
      interaction.editReply({ embeds: [embeds[currentPage]], components: [row, row2]})
    }
  }
//Home button
      else if (id === 'home'){
        currentPage = 0;
        ButtonInteraction.deferUpdate()
        interaction.editReply({ embeds: [shopHome], components: [roleNav, roleNav2]})
      }

//Next Page
     else if(id === "next"){
        ButtonInteraction.deferUpdate()
            if (currentPage < embeds.length - 1) {
              console.log(currentPage)
                currentPage++;
        
               
            
            interaction.editReply({ embeds: [embeds[currentPage]], components: [row, row2] });
            } else {
                currentPage = 0;
            interaction.editReply({ embeds:  [shopHome], components: [roleNav, roleNav2]});
            }      
          }
          else if(id === "exit"){
            ButtonInteraction.deferUpdate()
            shopCollector.stop()
            interaction.editReply({ content: "Exited shop...", components: [], embeds: []});
          }




//Buy button
   else if (id === 'buy'){
      await wait (200)
        ButtonInteraction.deferUpdate()
    
//User's Database Values for inventory, balance, and level
        var level =  db.fetch(`guild_${guild.id}_level_${user.id}`) || 0;
        var amount =  db.fetch(`money_${guild.id}_${user.id}`);

//calculating how much more X user needs to buy role
let neededAmt = rolePrices[currentPage] - amount;
let neededLvls = roleLevel[currentPage] - level;


//Embeds if user doesn't qualify for role
        let balCheck = new MessageEmbed()
        .setTitle('Oops!')
        .setDescription(`You do not have enough credits to buy ${guild.roles.cache.get(`${roleChecks[currentPage]}`)}, ${neededAmt} credits to go`)
        .setColor('RANDOM')
        .setTimestamp()

        let levelCheck = new MessageEmbed()
        .setTitle('Oops!')
        .setDescription(`You are not the required level to buy this role, ${neededLvls} levels to go`)
        .setColor('RANDOM')
      
        let alreadyOwned = new MessageEmbed()
        .setTitle('Oops!')
        .setDescription(`You already own this role! Unable to purchase duplicate roles`)
        .setColor('RANDOM')

        let confirm = new MessageEmbed()
        .setTitle('Confirm Purchase')
        .setDescription(`Are you sure you want to purchase ${guild.roles.cache.get(`${roleChecks[currentPage]}`)} ?\n\n`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter('Note: Selling your role will only return 75% of your credits.')

 

//Going through the motions of checking if user is eligible for role purchase
  if (amount < `${[rolePrices[currentPage]]}`) {
       return interaction.editReply({embeds: [balCheck], components: [goBack] });
          }
       else if (level < `${[roleLevel[currentPage]]}`){
        return interaction.editReply({ embeds: [levelCheck], components: [goBack] })  
        } 
       else if (items.includes(`${interaction.guild.roles.cache.get(`${roleChecks[currentPage]}`)}`)) {
        return interaction.editReply({ embeds: [alreadyOwned], components: [goBack] })         
        }
    else {
    //If they are eligible... Check if they really meant to buy the role
 interaction.editReply({embeds: [confirm], components: [options] })   
      }
      }


     else if (id == 'buyIt') {
      shopCollector.stop();
        ButtonInteraction.deferUpdate()
        await wait(2000)     

   

          //RECEIPT & CONGRATULATORY EMBEDS
        let confirmedPurchase = new MessageEmbed()
        .setTitle('Congratulations!')
        .setDescription(`You are now the proud owner of ${guild.roles.cache.get(`${roleChecks[currentPage]}`)}, This color suits you well! A receipt has been sent to your DMs\n\nIf you would like to buy another role, or want to browse, please close this instance & run the \`/shop\` command again, this is done to avoid confusion in the backend.\n\n `)
        .setFooter('Thank you for shopping with the Harmony House Role Shop!')
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setTimestamp()
  //A little fun
  let ranString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  //Receipt Embed
          let receipt = new MessageEmbed()
          .setTitle('H.H Role Shop Receipt')
          .setDescription(`You are receiving this because you just bought **${roleName[currentPage]}** from the H.H role shop, congratulations!`)
          .setFooter(`Purchase ID ${ranString}`)
          .addField('Cost', `${rolePrices[currentPage]} Credits`)
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .setTimestamp()


//Take user from DMS to Dayglow
const backToDayglow = new MessageActionRow() 
.addComponents(
  new MessageButton()
  .setURL(`https://discord.com/channels/646074330249429012/732726820893360140/867435825411522581`)
  .setLabel('Back To Dayglow')
  .setStyle('LINK')
    )

/*// Button for when user successfully buys a role
const returnHome = new MessageActionRow() 
.addComponents(
  new MessageButton()
  .setCustomId('return')
  .setLabel('Return Home')
  .setStyle('PRIMARY')
    ) */

        interaction.editReply({ embeds: [confirmedPurchase], components: []});
        await wait(400)
        interaction.user.send({ embeds: [receipt], components: [backToDayglow] });
        db.push(user.id,`${interaction.guild.roles.cache.get(`${roleChecks[currentPage]}`)}`);
        db.subtract(`money_${guild.id}_${user.id}`, `${rolePrices[currentPage]}`);

     
      }


//Cancel purchase interaction
else if (id === 'cancel'){
  ButtonInteraction.deferUpdate()
   interaction.editReply({ embeds: [embeds[currentPage]], components: [row, row2] })
}




 else if (id === 'sell'){
  ButtonInteraction.deferUpdate()
        //Confirm if user wants to sell role
        const options2 = new MessageActionRow() 
        .addComponents(
          new MessageButton()
          .setCustomId('sellit')
          .setLabel('Sell Role')
          .setStyle('DANGER')
      ,
        new MessageButton()
        .setCustomId('cancelSell')
        .setLabel('Cancel')
         .setStyle('PRIMARY')
            )
  
  let confirmSell = new MessageEmbed()
  .setTitle(`Sell Role`)
  .setDescription(`Are you sure you want to sell ${guild.roles.cache.get(`${roleChecks[currentPage]}`)}? You will only get 75% of your credits back.`)
  .setTimestamp()

   interaction.editReply({ embeds: [confirmSell], components: [options2] })
}
 

else if (id === 'sellit'){
  shopCollector.stop();
        ButtonInteraction.deferUpdate()
 
      let soldRole = new MessageEmbed()
      .setTitle('Success!')
      .setDescription(`You have successfully sold ${guild.roles.cache.get(`${roleChecks[currentPage]}`)}! Added ${rolePrices[currentPage] * 0.75} credits to your balance. If you are still shopping, please feel free to run the \`/shop\` command again.`)
      .setTimestamp()
      let notOwned = new MessageEmbed()
      .setTitle('Oops!')
      .setDescription(`Looks like you don't own ${guild.roles.cache.get(`${roleChecks[currentPage]}`)}`)
      .setTimestamp()



        if (!items.includes(`${interaction.guild.roles.cache.get(`${roleChecks[currentPage]}`)}`)) {
           return interaction.editReply({ embeds: [notOwned], components: [goBack] })         
          }
           else
          db.add(`money_${guild.id}_${user.id}`,`${rolePrices[currentPage] * 0.75}`)

          const arr = db.fetch(user.id); // ['an', 'word', 'of', 'items']
const filtered = arr.filter(e => e !== `${interaction.guild.roles.cache.get(`${roleChecks[currentPage]}`)}`); // excludes string 'word' from the new array

db.set(user.id, filtered);

         interaction.editReply({ embeds: [soldRole], components: [] })
      }





//Cancel selling of role
     else if (id === 'cancelSell'){
        ButtonInteraction.deferUpdate()
         interaction.editReply({ embeds: [embeds[currentPage]], components: [row, row2] })
      }
//Go Back interaction
     else if (id === 'goBack'){
        ButtonInteraction.deferUpdate()
         interaction.editReply({ embeds: [embeds[currentPage]], components: [row, row2] })
      }
//Return to main menu interaction
     else if (id === 'return'){
        ButtonInteraction.deferUpdate()
         interaction.editReply({ embeds: [shopHome], components: [roleNav] })
      }
    })

    shopCollector.on('end', (collected, reason) => {
      console.log(`Collected ${collected.size} items`);
        //interaction.editReply({ content: 'Shop is now closing... Press "Dismiss Message" to close this message!', embeds: [], components: [] })
    });

  },
};

                              
