module.exports = {
    commands: status,
    expectedArgs: '<status>',
    permissionError: 'You need do not have permissions to run this command',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const content = message.content.replace('>status ', '')
            .setPresence({
                activity: {
                    name: content,
                    type: 2,
                },
            })
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
  }