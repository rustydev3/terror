const { config } = require('../config.json'); // Assuming config.json is in the same directory

module.exports = {
    name: 'antinukeenable',
    description: 'Enable anti-nuke features',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply("You don't have permission to use this command.");
        }

        config[message.guild.id] = config[message.guild.id] || {};
        config[message.guild.id].antinuke = true;
        message.reply('Anti-nuke has been enabled.');

        // Optionally save the updated config to the file
    },
};
