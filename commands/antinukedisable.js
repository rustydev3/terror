const { config } = require('../config.json');

module.exports = {
    name: 'antinukedisable',
    description: 'Disable anti-nuke features',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply("You don't have permission to use this command.");
        }

        config[message.guild.id] = config[message.guild.id] || {};
        config[message.guild.id].antinuke = false;
        message.reply('Anti-nuke has been disabled.');

        // Optionally save the updated config to the file
    },
};
