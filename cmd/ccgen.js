const cardGen = require('card-number-generator');

function generateRandomExpiration() {
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomYear = Math.floor(Math.random() * 5) + 2025;
  return `${randomMonth.toString().padStart(2, '0')}|${randomYear}`;
}

function generateRandomCVV() {
  return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
}

function generateRandomBin() {
  const prefixes = ['4', '51', '52', '53', '54', '55', '34', '37', '6011'];
  return prefixes[Math.floor(Math.random() * prefixes.length)];
}

module.exports = function handleCcgenCommand(bot, msg, bin = '') {
  const chatId = msg.chat.id;

  try {
    const baseBin = bin || generateRandomBin();
    const generatedCard = `${cardGen({ starts_with: baseBin })}|${generateRandomExpiration()}|${generateRandomCVV()}`;
    const ccgenMessage = `Here's a ${bin ? 'BIN-specific ' : 'Random generated '}Credit Card:\n\n${generatedCard}`;
    bot.sendMessage(chatId, ccgenMessage);
  } catch (error) {
    console.error('Error generating credit card:', error.message);
    bot.sendMessage(chatId, 'An error occurred while generating a credit card.');
  }
};
