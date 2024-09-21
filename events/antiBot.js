module.exports = {
    name: 'guildMemberAdd',
    async execute(bot, member) {
        const guild = member.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'BOT_ADD' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            await member.kick();  // Kick the bot
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Added bot' });  // Ban the violator
        }
    },
};
