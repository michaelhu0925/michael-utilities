module.exports = {
    commands: ['k', 'kick'],
    expectedArgs: '<@user> <reason>',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${targetMember} has been kicked successfully.`)
        } else {
            message.channel.send(`${tag} Please specify someone to kick.`)
        }
    },
    permissions: 'KICK_MEMBERS',
  }