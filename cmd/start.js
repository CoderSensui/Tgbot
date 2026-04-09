module.exports = function handleStartCommand(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const channelUsername = '-1001817713360';
  const channelUrl = `https://t.me/SensuiBots`;

  bot.getChatMember(channelUsername, userId)
    .then(member => {
      if (member.status === 'member' || member.status === 'administrator' || member.status === 'creator') {
        const welcomeMessage = `Hello ${msg.from.first_name} Thanks For Using This Bot Dont Forget To Check Updates In My Channel.\n\nUse /help to See All Available Commands\n\n@CoderSensui Created Me.`;
        const keyboard = {
          inline_keyboard: [
            [{ text: 'Check out my Channel For Updates', url: channelUrl }]
          ]
        };

        bot.sendMessage(chatId, welcomeMessage, {
          parse_mode: 'Markdown',
          reply_markup: JSON.stringify(keyboard)
        });
      } else {
        const notwelcomeMessage = `Hello ${msg.from.first_name} You Need To Join My Channel First Before you Can Use This Bot!\n\n@CoderSensui Created Me.`;
        const keyboard = {
          inline_keyboard: [
            [{ text: 'Join Here', url: channelUrl }]
          ]
        };

        bot.sendMessage(chatId, notwelcomeMessage, {
          parse_mode: 'Markdown',
          reply_markup: JSON.stringify(keyboard)
        });
      }
    })
    .catch(error => {
      console.error('Error checking channel membership:', error);
      bot.sendMessage(chatId, 'Something went wrong. Please try again later.');
    });
};
