const warns = require('../warns.json');

module.exports = {
    name: 'warns',
    description: 'Show warnings for a mentioned member.',
    execute(message) {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to check warnings.');

        const guildWarns = warns[message.guild.id];
        if (guildWarns && guildWarns[member.id]) {
            const memberWarns = guildWarns[member.id].warns;
            message.reply(`${member.user.tag} has the following warnings: ${memberWarns.join(', ')}`);
        } else {
            message.reply(`${member.user.tag} has no warnings.`);
        }
    },
};
