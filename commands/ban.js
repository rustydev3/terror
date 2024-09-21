module.exports = {
    name: 'ban',
    description: 'Ban a member from the server',
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        if (!member) return message.reply('Please mention a member to ban.');

        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply("You don't have permission to use this command.");
        }

        await member.ban();
        message.reply(`${member.user.tag} has been banned.`);
    },
};
