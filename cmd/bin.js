const axios = require('axios');

module.exports = function handleBinCommand(bot, msg, bin) {
  const chatId = msg.chat.id;

  if (!bin || !/^\d{6,8}$/.test(bin)) {
    bot.sendMessage(chatId, 'Please provide a valid BIN (6-8 digits).\nExample: /bin 414720');
    return;
  }

  const binDetailsUrl = `https://lookup.binlist.net/${bin}`;

  axios.get(binDetailsUrl)
    .then(response => {
      const binDetails = response.data;
      const message = `
BIN Details for ${bin}:
Number:
  - Length: ${binDetails.number?.length ?? 'N/A'}
  - Luhn Check: ${binDetails.number?.luhn ? 'Passed' : 'Failed'}
Scheme: ${binDetails.scheme ?? 'N/A'}
Type: ${binDetails.type ?? 'N/A'}
Brand: ${binDetails.brand ?? 'N/A'}
Prepaid: ${binDetails.prepaid ? 'Yes' : 'No'}
Country:
  - Numeric: ${binDetails.country?.numeric ?? 'N/A'}
  - Alpha2: ${binDetails.country?.alpha2 ?? 'N/A'}
  - Name: ${binDetails.country?.name ?? 'N/A'}
  - Currency: ${binDetails.country?.currency ?? 'N/A'}
  - Emoji: ${binDetails.country?.emoji ?? ''}
  - Location: Latitude ${binDetails.country?.latitude ?? 'N/A'}, Longitude ${binDetails.country?.longitude ?? 'N/A'}
Bank: ${binDetails.bank?.name ?? 'Not available'}
`;
      bot.sendMessage(chatId, message);
    })
    .catch(error => {
      if (error.response?.status === 404) {
        bot.sendMessage(chatId, `No data found for BIN: ${bin}. Try a different BIN.`);
      } else {
        bot.sendMessage(chatId, 'Sorry, an error occurred while fetching BIN details.');
      }
    });
};
