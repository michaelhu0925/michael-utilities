module.exports = {
    commands: ['ctc', 'createtextchannel'],
    expectedArgs: '<channel name>',
    permissionError: 'You need do not have permissions to run this command',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const name = message.content.replace('>createtextchannel ', '')
        message.guild.channels.create(name, {
                type: 'text'
            })
            .then(channel => {})
    },
    permissions: 'ADMINISTRATOR',
    requiredRoles: [],
  }