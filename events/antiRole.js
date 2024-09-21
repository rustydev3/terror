module.exports = {
    name: 'roleCreate',
    async execute(bot, role) {
        const guild = role.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'ROLE_CREATE' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            await role.delete();  // Delete the created role
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Created a role' });  // Ban the violator
        }
    },
};

module.exports = {
    name: 'roleDelete',
    async execute(bot, role) {
        const guild = role.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'ROLE_DELETE' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            // Optionally recreate the role or just ban the executor
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Deleted a role' });  // Ban the violator
        }
    },
};

module.exports = {
    name: 'roleUpdate',
    async execute(bot, oldRole, newRole) {
        const guild = oldRole.guild;
        const auditLogs = await guild.fetchAuditLogs({ type: 'ROLE_UPDATE' });
        const log = auditLogs.entries.first();
        const executor = log.executor;

        if (config[guild.id]?.antinuke && !config[guild.id].whitelist.includes(executor.id)) {
            await newRole.edit(oldRole);  // Revert the role update
            await guild.members.ban(executor.id, { reason: 'Anti-nuke: Updated a role' });  // Ban the violator
        }
    },
};
