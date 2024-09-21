const fs = require('fs');
const warns = require('../warns.json');

module.exports = {
    name: 'warn',
    description: 'Warn a member.',
    execute(message, args) {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to warn.');

        const reason = args.slice(1).join(' ') || 'No reason provided.';
        if (!warns[message.guild.id]) {
            warns[message.guild.id] = {};
        }
        if (!warns[message.guild.id][member.id]) {
            warns[message.guild.id][member.id] = { warns: [] };
        }

        warns[message.guild.id][member.id].warns.push(reason);
        fs.writeFileSync('./warns.json', JSON.stringify(warns, null, 2));
        message.reply(`Warned ${member.user.tag} for: \`${reason}\``);
    },
};
