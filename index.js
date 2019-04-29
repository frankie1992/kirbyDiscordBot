require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const lhost = 'http://127.0.0.1:5000/';
const memeHost = 'https://meme-api.herokuapp.com/';
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

function getRandomMeme(endPoint) {
  return new Promise(function(resolve, reject) {
  const xhr = new XMLHttpRequest();
      xhr.onload = function() {
          resolve(this.responseText);
      };
      xhr.onerror = reject;
      xhr.open('GET', memeHost+endPoint);
      xhr.send();
  });
}

try{

client.on('message', msg=> {

  let msg1 = msg.content.toLowerCase();

  if (msg.isMentioned(client.user)) {
    const rand = Math.floor(Math.random() * Math.floor(4));
    if(rand === 0){msg.reply('yes', { tts: false });}
    if(rand === 1){msg.reply('no', { tts: false });}
    if(rand === 2){msg.reply('no', { tts: false });}
    if(rand === 3){msg.reply('maybe', { tts: false });}
}
  else if(msg1.includes("thank")) {
  msg.reply("You're welcome")
}
  else{
    switch (msg1) {

      case '/randommeme':
        getRandomMeme('gimme').then( (result) => {
          if(result){
            const memelink = JSON.parse(result).url;
            msg.reply(memelink)
          }
          else{
            msg.reply("error, result is empty")
          }
        })
        .catch((err) => {
          msg.reply("error, failed to get result")
        });
        break; 
        
      case '/kirbymeme':
        getRandomMeme('gimme/kirby').then( (result) => {
          if(result){
            const memelink = JSON.parse(result).url;
            msg.reply(memelink)
          }
          else{
            msg.reply("error, result is empty")
          }
        })
        .catch((err) => {
          msg.reply("error, failed to get result")
        });
        break; 

      case 'f':
        for(i=0; i < 10; i++){
          msg.reply('f', { tts: false })
          }
      break; 

      case '/sadkirby':
      msg.reply('https://data.whicdn.com/images/316839211/large.jpg')
      break; 
    }
  }

});


}
catch(err){console.log(err)} 
client.login(process.env.TOKEN)