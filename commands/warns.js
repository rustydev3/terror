const fs = require('fs');
const warnsPath = '../warns.json';

module.exports = {
    name: 'warns',
    description: 'Show warns of the mentioned member',
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        
        if (!member) return message.reply('Please mention a member to check warnings.');

        const warns = JSON.parse(fs.readFileSync(warnsPath, 'utf-8')) || {};
        const userWarns = warns[message.guild.id]?.[member.id] || [];

        if (userWarns.length === 0) {
            return message.reply(`${member.user.tag} has no warnings.`);
        }

        message.reply(`${member.user.tag} has the following warnings: ${userWarns.join(', ')}`);
    },
};
