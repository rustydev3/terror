const fs = require('fs');
const warnsPath = '../warns.json'; // Path to warns.json

module.exports = {
    name: 'warn',
    description: 'Warn a member',
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';
        
        if (!member) return message.reply('Please mention a member to warn.');

        const warns = JSON.parse(fs.readFileSync(warnsPath, 'utf-8')) || {};
        warns[message.guild.id] = warns[message.guild.id] || {};
        warns[message.guild.id][member.id] = warns[message.guild.id][member.id] || [];
        warns[message.guild.id][member.id].push(reason);

        fs.writeFileSync(warnsPath, JSON.stringify(warns, null, 2));
        message.reply(`${member.user.tag} has been warned for: ${reason}`);
    },
};
