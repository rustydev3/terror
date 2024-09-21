module.exports = {
    name: 'guildBanAdd',
    async execute(bot, ban) {
        const guild = ban.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'MEMBER_BAN_ADD' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            await guild.members.unban(ban.user.id);  // Unban the banned user
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Banned a member' });  // Ban the violator
        }
    },
};
