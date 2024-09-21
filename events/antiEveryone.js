module.exports = {
    name: 'messageCreate',
    async execute(bot, message) {
        const guild = message.guild;
        if (config[guild.id]?.antinuke && message.mentions.everyone && !config[guild.id].whitelist.includes(message.author.id)) {
            await message.delete();  // Delete the message
            await guild.members.ban(message.author.id, { reason: 'Anti-nuke: Mentioned everyone' });  // Ban the violator
        }
    },
};
