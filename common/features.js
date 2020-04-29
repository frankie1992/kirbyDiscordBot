const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const memeHost = 'https://meme-api.herokuapp.com/';

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
            msg.reply(memeLink)
        } else {
            msg.reply("error, result is empty")
        }
    })
        .catch((err) => {
            msg.reply("error, failed to get result")
        });
}

const getRandomMeme = (msg) => {
    getMeme('gimme').then((result) => {
        if (result) {
            const memelink = JSON.parse(result).url;
            msg.reply(memelink)
        } else {
            msg.reply("error, result is empty")
        }
    })
        .catch((err) => {
            msg.reply("error, failed to get result")
        });
}

const getQuestionResponse = (msg) => {
    const rand = Math.floor(Math.random() * Math.floor(4));
    if (rand === 0) {
        msg.reply('yes', {tts: false});
    }
    if (rand === 1) {
        msg.reply('no', {tts: false});
    }
    if (rand === 2) {
        msg.reply('ask me later', {tts: false});
    }
    if (rand === 3) {
        msg.reply('maybe', {tts: false});
    }
}
exports.getKirbyMeme = getKirbyMeme;
exports.getRandomMeme = getRandomMeme;
exports.getQuestionResponse = getQuestionResponse;