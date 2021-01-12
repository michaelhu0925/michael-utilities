module.exports = (client) => {
    const channelId = '730717878046818365 ' //welcome channel
    client.on('guildMemberAdd', (member) => {
        console.log(member)

        const message = `Hey <@${member.id}>, welcome to the server! Please verify at <#730717878046818366> and enjoy your stay.`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}