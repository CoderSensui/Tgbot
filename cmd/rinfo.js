const axios = require('axios');

module.exports = function handleRinfoCommand(bot, msg) {
  const chatId = msg.chat.id;
  const apiUrl = 'https://randomuser.me/api/';

  axios.get(apiUrl)
    .then(response => {
      const user = response.data.results[0];
      const info = {
        name: `${user.name.first} ${user.name.last}`,
        gender: user.gender,
        age: user.dob.age,
        email: user.email,
        phone: user.phone,
        cell: user.cell,
        address: {
          street: `${user.location.street.number} ${user.location.street.name}`,
          city: user.location.city,
          state: user.location.state,
          country: user.location.country,
          postcode: user.location.postcode,
        },
        nationality: user.nat,
        username: user.login.username,
        registered: user.registered.date,
        dob: user.dob.date,
        timezone: user.location.timezone.description,
      };

      const message = `
Random Info:
  - Name: ${info.name}
  - Gender: ${info.gender}
  - Age: ${info.age}
  - Email: ${info.email}
  - Phone: ${info.phone}
  - Cell: ${info.cell}
  - Address:
    - Street: ${info.address.street}
    - City: ${info.address.city}
    - State: ${info.address.state}
    - Country: ${info.address.country}
    - Postcode: ${info.address.postcode}
  - Nationality: ${info.nationality}
  - Username: ${info.username}
  - Registered: ${info.registered}
  - Date of Birth: ${info.dob}
  - Timezone: ${info.timezone}
`;
      bot.sendMessage(chatId, message);
    })
    .catch(error => {
      bot.sendMessage(chatId, 'Sorry, an error occurred while fetching random info.');
    });
};
