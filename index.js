require('dotenv').config()

const { Client, Attachment } = require('discord.js');
const client = new Client();
const features = require('./common/features.js')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    features.startScheduler(client);
})

try {
    client.on('message', msg => {
        let msg1 = msg.content.toLowerCase();
        let attachment;
        if (msg.isMentioned(client.user)) {
            features.getQuestionResponse(msg);
        } else if (msg1.includes("thank")) {
            msg.reply("You're welcome")
        } else {
            switch (msg1) {
                case '/randommeme':
                    features.getRandomMeme(msg);
                    break;
                case '/kirbymeme':
                    features.getKirbyMeme(msg);
                    break;
                case 'f':
                    for (i = 0; i < 10; i++) {
                        msg.reply('f', {tts: false})
                    }
                    break;
                case 'nice':
                    attachment = new Attachment('https://cdn.discordapp.com/attachments/482225227611242508/574370061519945738/Capture.PNG');
                    msg.channel.send(attachment);
                    break;
            }
        }

    });


} catch (err) {
    console.log(err)
}
client.login(process.env.TOKEN)