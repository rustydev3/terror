module.exports = {
    name: 'kick',
    description: 'Kick a member from the server',
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to kick.');

        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply("You don't have permission to use this command.");
        }

        await member.kick();
        message.reply(`${member.user.tag} has been kicked.`);
    },
};
