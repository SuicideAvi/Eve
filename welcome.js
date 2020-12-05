module.exports = (client) => {
    const channelId = '729626300616147015' // welcome channel
    const targetChannnelId = '729622868715110401' // target channel

    client.on('guildMemberAdd', (member) => {
        console.log(member)

        const message = `Welcome <@${
         member.id
        }> to the server! Please read ${member.guild.channels.cache
        .get(targetChannnelId)
        .toString()}, thanks <3`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}