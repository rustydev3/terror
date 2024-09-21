module.exports = {
    name: 'mute',
    description: 'Mute a member in the server',
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to mute.');

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        if (!muteRole) {
            return message.reply('Mute role not found. Please create a role named "Muted".');
        }

        await member.roles.add(muteRole);
        message.reply(`${member.user.tag} has been muted.`);
    },
};
