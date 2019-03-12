require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})
client.on('message', msg => {
  if (msg.content === 'bing') {
    msg.reply('Bong!')
  }
})
client.login(process.env.BOT_TOKEN)
