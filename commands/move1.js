module.exports = {
    commands: 'move management',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.setParent('810032281343229962')
    },
    permissions: 'KICK_MEMBERS',
  }