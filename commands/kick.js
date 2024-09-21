const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a member from the server.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply("You don't have permission to kick members.");
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to kick.');

        try {
            await member.kick();
            message.reply(`Kicked ${member.user.tag} from the server.`);
        } catch (err) {
            console.error(err);
            message.reply("I couldn't kick that member.");
        }
    },
};
