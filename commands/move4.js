module.exports = {
    commands: 'move pending',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.setParent('801632645275582494')
    },
    permissions: 'KICK_MEMBERS',
  }