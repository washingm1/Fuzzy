const Discord = require('discord.js');
const client = new Discord.Client(); 
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("quick.db");
const { time } = require('console');

module.exports.run = async (bot, message, args) => {
var LastFmNode = require('lastfm').LastFmNode;

var lastfm = new LastFmNode({
  api_key: '03395a5107475cac2bbe80a0db101841',    // sign-up for a key at http://www.last.fm/api
  secret: '2257dfdf8085f2950bfe6dc40d5e8824',
  useragent: 'appname/vX.X MyApp' // optional. defaults to lastfm-node.
});

var trackStream = lastfm.stream('ADoormatt');

trackStream.on('lastPlayed', function(track) {
  message.channel.send('Last played: ' + track.name);

});

trackStream.on('nowPlaying', function(track) {
  console.log('Now playing: ' + track.name);
  message.channel.send('Now playing: ' + track.name)
});

trackStream.on('scrobbled', function(track) {
  console.log('Scrobbled: ' + track.name);
});

trackStream.on('stoppedPlaying', function(track) {
  console.log('Stopped playing: ' + track.name);
});

trackStream.on('error', function(error) {
  console.log('Error: '  + error.message);
});

trackStream.start();

var session = lastfm.session({
   token: 'w7UAlnfBXBc41qzoJdb3TNRawmtAI-lW',
   handlers: {
      success: function(session) {
         lastfm.update('nowplaying', session, { track: track } );
         lastfm.update('scrobble', session, { track: track, timestamp: 12345678 });
      }
   }
});



}

module.exports.help = {
    name: "fm",
    description: "FM Now playing",
    aliases: [""]
}
