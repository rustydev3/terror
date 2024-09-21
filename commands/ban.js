const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Ban a member from the server.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply("You don't have permission to ban members.");
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to ban.');

        try {
            await member.ban();
            message.reply(`Banned ${member.user.tag} from the server.`);
        } catch (err) {
            console.error(err);
            message.reply("I couldn't ban that member.");
        }
    },
};
