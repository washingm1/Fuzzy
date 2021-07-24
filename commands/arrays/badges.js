const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require('canvas');

const badges = 
[
  {pic:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
{pic: await Canvas.loadImage('https://static.toiimg.com/thumb/msid-53891743,width-748,height-499,resizemode=4,imgsize-152022/.jpg')},
{pic: await Canvas.loadImage('https://www.planetware.com/wpimages/2019/10/switzerland-in-pictures-most-beautiful-places-matterhorn.jpg')}
]

module.exports = {badges};