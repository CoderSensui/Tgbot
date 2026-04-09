const fs = require('fs');
const bottoken = require('./bottoken.json');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const axios = require('axios');
const botToken = bottoken.botToken;
const bot = new TelegramBot(botToken, { polling: true });

const port = process.env.PORT || 3000;

const blueColor = '\x1b[34m';
const redColor = '\x1b[31m';
const resetColor = '\x1b[0m';
const redBoxStart = '⊹˚₊‧───────────────‧₊˚⊹';
const redBoxEnd = '⊹˚₊‧───────────────‧₊˚⊹';
const violetColor = '\x1b[38;2;148;0;211m';
const greenColor = '\x1b[32m';
const orangeColor = '\x1b[33m';

const commandFiles = fs.readdirSync('./cmd').filter(file => file.endsWith('.js'));
const workingCommands = [];
const nonWorkingCommands = [];

commandFiles.forEach(file => {
  try {
    const commandHandler = require(`./cmd/${file}`);
    if (typeof commandHandler === 'function') {
      workingCommands.push(file);
    } else {
      nonWorkingCommands.push(file);
    }
  } catch (error) {
    nonWorkingCommands.push(file);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const handleStartCommand = require('./cmd/start');
const handleBinCommand = require('./cmd/bin');
const handleRinfoCommand = require('./cmd/rinfo');
const handleHelpCommand = require('./cmd/help');
const handleCcgenCommand = require('./cmd/ccgen');
const handleTempMailCommand = require('./cmd/tempmail');

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (!messageText) return;

  console.log(`${redColor}[ ${blueColor}↓ Received message from user ${msg.from.username} ↓${redColor} ]\n${redColor}[ ${blueColor}${messageText}${redColor} ]\n${violetColor}${redBoxEnd}`);

  if (messageText === '/start') {
    handleStartCommand(bot, msg);
  } else if (messageText.startsWith('/bin ')) {
    const bin = messageText.split(' ')[1];
    handleBinCommand(bot, msg, bin);
  } else if (messageText === '/rinfo') {
    handleRinfoCommand(bot, msg);
  } else if (messageText.startsWith('/help')) {
    const command = messageText.split(' ')[1];
    handleHelpCommand(bot, msg, command);
  } else if (messageText.startsWith('/ccgen')) {
    const bin = messageText.split(' ')[1];
    handleCcgenCommand(bot, msg, bin);
  } else if (messageText.startsWith('/tempmail')) {
    const args = messageText.split(' ').slice(1);
    handleTempMailCommand(bot, msg, args);
  } else {
    bot.sendMessage(chatId, 'I don\'t understand that command. Type /start to begin.');
  }
});

app.listen(port, () => {
  console.log(`${violetColor}${redBoxStart}\n${redColor}[ ${blueColor}Serving The Bot On Port ${port} ${redColor}]\n${violetColor}${redBoxEnd}`);
  console.log(`${redColor}[ ${blueColor}Bot is online and listening for messages. ${redColor}]\n${violetColor}${redBoxEnd}`);
});

console.log(`${violetColor}${redBoxStart}\n${redColor}[ ${blueColor}Available Commands : ${commandFiles.length}${redColor} ]`);
console.log(`${redColor}[ ${blueColor}Working Commands: ${workingCommands.length}${redColor} ]`);
console.log(`${redColor}[ ${blueColor}Non-Working Commands: ${nonWorkingCommands.length}${redColor} ]\n${violetColor}${redBoxEnd}`);

process.on('uncaughtException', (err) => {
  console.error(`${redColor}[ An uncaught exception occurred:${redColor} ]`);
  console.error(`${redColor}[ ${err.message}${resetColor}\n${orangeColor}${redBoxEnd}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`${redColor}[ An unhandled promise rejection occurred:${redColor} ]`);
  console.error(`${redColor}[ ${reason}${redColor} ]\n${orangeColor}${redBoxEnd}`);
});
