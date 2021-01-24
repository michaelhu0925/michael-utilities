module.exports = {
    commands: ['b', 'ban'],
    expectedArgs: '<@user> <reason>',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.ban()
            message.channel.send(`${targetMember} has been banned successfully.`)
        } else {
            message.channel.send(`${tag} Please specify someone to ban.`)
        }
    },
    permissions: 'BAN_MEMBERS',
    requiredRoles: [''],
  }