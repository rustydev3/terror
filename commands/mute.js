const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'mute',
    description: 'Mute a member in the server.',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            return message.reply("You don't have permission to mute members.");
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to mute.');

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) return message.reply('Mute role does not exist.');

        try {
            await member.roles.add(muteRole);
            message.reply(`Muted ${member.user.tag}.`);
        } catch (err) {
            console.error(err);
            message.reply("I couldn't mute that member.");
        }
    },
};
