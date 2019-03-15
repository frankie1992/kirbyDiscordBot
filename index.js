require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
      xhr.open('GET', 'https://meme-api.herokuapp.com/'+endPoint);
      xhr.send();
  });
}

client.on('message', msg => {
  if (msg.content === '/randomMeme') {
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
  }
})

client.on('message', msg => {
  if (msg.content === '/kirbyMeme') {
    getRandomMeme('gimme/kirby').then( (result) => {
      if(result){
        const memelink = JSON.parse(result).url;
        msg.reply(memelink)
      }
      else{d
        msg.reply("error, result is empty")
      }
    })
    .catch((err) => {
      msg.reply("error, failed to get result")
  });
  }
})

client.on('message', msg => {
  if (msg.content === '/sadkirby') {
    msg.reply('https://data.whicdn.com/images/316839211/large.jpg')
  }
})

client.on('message', msg => {
  if (msg.content === 'f'.ignoreCase) {
    for(i=0; i < 10; i++){
    msg.reply('f')
    }
  }
})
client.on('message', msg => {
  if (msg.content === 'F') {
    for(i=0; i < 10; i++){
    msg.reply('f')
    }
  }
})

client.login(process.env.TOKEN)
