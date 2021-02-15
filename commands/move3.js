module.exports = {
    commands: 'move',
    expectedArgs: 'partnership',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.setParent('810032640921042985')
    },
    permissions: 'KICK_MEMBERS',
  }