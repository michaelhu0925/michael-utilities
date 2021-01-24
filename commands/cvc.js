module.exports = {
    commands: 'cvc',
    expectedArgs: '<channel name>',
    permissionError: 'You need do not have permissions to run this command',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const name = message.content.replace('>cvc ', '')
        message.guild.channels.create(name, {
                type: 'voice'
            })
            .then(channel => {})
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
  }