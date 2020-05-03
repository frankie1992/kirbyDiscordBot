const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const memeHost = 'https://meme-api.herokuapp.com/';
const cron = require('cron');

const getMeme = (endPoint) => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(this.responseText);
        };
        xhr.onerror = reject;
        xhr.open('GET', memeHost + endPoint);
        xhr.send();
    });
}

const getKirbyMeme = (msg) => {
    getMeme('gimme/kirby').then((result) => {
        if (result) {
            const memeLink = JSON.parse(result).url;
            msg.channel.send(memeLink)
        } else {
            msg.channel.send("error, result is empty")
        }
    })
        .catch((err) => {
            msg.channel.send("error, failed to get result")
        });
}

const getRandomMeme = (msg) => {
    getMeme('gimme').then((result) => {
        if (result) {
            const memelink = JSON.parse(result).url;
            msg.channel.send(memelink)
        } else {
            msg.channel.send("error, result is empty")
        }
    })
        .catch((err) => {
            msg.channel.send("error, failed to get result")
        });
}

const getQuestionResponse = (msg) => {
    const rand = Math.floor(Math.random() * Math.floor(4));
    if (rand === 0) {
        msg.channel.send('yes', {tts: false});
    }
    if (rand === 1) {
        msg.channel.send('no', {tts: false});
    }
    if (rand === 2) {
        msg.channel.send('ask me later', {tts: false});
    }
    if (rand === 3) {
        msg.channel.send('maybe', {tts: false});
    }
}

const startScheduler = (client) => {
    const scheduledMessage = new cron.CronJob('00 9 * * SUN', () => {
        client.channels.get("701978679449747476").send("@everyone Dont forget to buy turnips today");
      });
      scheduledMessage.start();
}

exports.getKirbyMeme = getKirbyMeme;
exports.getRandomMeme = getRandomMeme;
exports.getQuestionResponse = getQuestionResponse;
exports.startScheduler = startScheduler;