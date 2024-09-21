const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'antinukeenable',
    description: 'Enable anti-nuke features in this server.',
    execute(message) {
        config[message.guild.id] = { antinuke: true };
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 2));
        message.reply('Anti-nuke features enabled.');
    },
};
