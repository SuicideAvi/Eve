module.exports = client => {
    const channelId = '784761182203543593'

    const updateMembers = (guild) => {
        const channel = guild.channels.guild.cache.get(channelId)
        channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
    }

        client.on('guildMemberAdd', (member) => updateMembers(member.guild))
        client.on('guildMemberRemove', (member) => updateMembers(member.guild))
        
        const guild = client.guilds.cache.get('718227978810818581')
        updateMembers(guild)
}