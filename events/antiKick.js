module.exports = {
    name: 'guildMemberRemove',
    async execute(bot, member) {
        const guild = member.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_KICK' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Kicked member' });  // Ban the violator
        }
    },
};
