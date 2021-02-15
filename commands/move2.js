module.exports = {
    commands: 'move',
    expectedArgs: 'moderation',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.setParent('810032466814828554')
    },
    permissions: 'KICK_MEMBERS',
  }