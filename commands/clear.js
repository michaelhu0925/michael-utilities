module.exports = {
    commands: ['cc','clearchannel'],
    permissionError: 'You need do not have permissions to run this command',
    minArgs: 0,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.messages.fetch().then(results => {
            message.channel.bulkDelete(results)
        })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
  }