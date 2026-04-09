module.exports = function handleHelpCommand(bot, msg, command) {
  const chatId = msg.chat.id;

  if (command) {
    switch (command) {
      case 'start':
        bot.sendMessage(chatId, '/start - To begin using the bot.');
        break;
      case 'help':
        bot.sendMessage(chatId, '/help - To display this help message.');
        break;
      case 'bin':
        bot.sendMessage(chatId, '/bin - To fetch details about a BIN. Example: /bin 414720.');
        break;
      case 'rinfo':
        bot.sendMessage(chatId, '/rinfo - To fetch random user information.');
        break;
      case 'ccgen':
        bot.sendMessage(chatId, '/ccgen - To generate a Random Credit Card\n/ccgen [BIN] - To generate a Credit Card from a bin. Example: /ccgen 414720.');
        break;
      case 'tempmail':
        bot.sendMessage(chatId, '/tempmail - To generate a temporary email address.\n/tempmail [EMAIL] - to fetch inbox messages for a temporary email.');
        break;
      default:
        bot.sendMessage(chatId, 'Sorry, I don\'t have specific help for that command.');
        break;
    }
  } else {
    const helpMessage = `Here are the available commands:
    
/start
/help
/bin [BIN]
/rinfo
/ccgen
/tempmail

You can use /help [command name] to get more details about a specific command.\nEx: /help rinfo`;

    bot.sendMessage(chatId, helpMessage);
  }
};
