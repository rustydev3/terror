module.exports = {
    name: 'channelCreate',
    async execute(bot, channel) {
        const guild = channel.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            await channel.delete();  // Delete the created channel
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Created a channel' });  // Ban the violator
        }
    },
};

module.exports = {
    name: 'channelDelete',
    async execute(bot, channel) {
        const guild = channel.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            // Optionally recreate the channel or just ban the executor
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Deleted a channel' });  // Ban the violator
        }
    },
};

module.exports = {
    name: 'channelUpdate',
    async execute(bot, oldChannel, newChannel) {
        const guild = oldChannel.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'CHANNEL_UPDATE' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            await newChannel.edit(oldChannel);  // Revert the channel update
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Updated a channel' });  // Ban the violator
        }
    },
};
