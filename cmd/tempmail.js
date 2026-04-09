const axios = require('axios');
const he = require('he');

const generateTempMail = async () => {
  try {
    const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox');
    return response.data;
  } catch (error) {
    console.error('Error generating temporary email:', error);
    return null;
  }
};

const getTempMailInbox = async (email) => {
  try {
    const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${email.split('@')[0]}&domain=${email.split('@')[1]}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching temporary email inbox:', error);
    return null;
  }
};

const getTempMailMessage = async (email, messageId) => {
  try {
    const response = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${email.split('@')[0]}&domain=${email.split('@')[1]}&id=${messageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching temporary email message:', error);
    return null;
  }
};

const stripHtmlTags = (html) => {
  return he.decode(html.replace(/<[^>]*>/g, ''));
};

module.exports = async (bot, msg, args) => {
  const chatId = msg.chat.id;

  if (args.length === 0) {
    const generatedEmail = await generateTempMail();
    if (generatedEmail) {
      bot.sendMessage(chatId, `Generated temporary email: ${generatedEmail}`);
    } else {
      bot.sendMessage(chatId, 'Error generating temporary email.');
    }
  } else {
    const requestedEmail = args[0];
    const inboxMessages = await getTempMailInbox(requestedEmail);

    if (inboxMessages === null) {
      bot.sendMessage(chatId, 'Error fetching inbox messages.');
      return;
    }

    if (inboxMessages.length === 0) {
      bot.sendMessage(chatId, `No messages yet for ${requestedEmail}.`);
      return;
    }

    let response = `Inbox messages for ${requestedEmail}:\n\n`;

    for (const message of inboxMessages) {
      const messageDetails = await getTempMailMessage(requestedEmail, message.id);
      if (messageDetails) {
        const plainTextBody = stripHtmlTags(messageDetails.body);
        response += `Sender: ${messageDetails.from}\nSubject: ${messageDetails.subject}\nMessage: ${plainTextBody}\n\n`;
      }
    }

    bot.sendMessage(chatId, response);
  }
};
