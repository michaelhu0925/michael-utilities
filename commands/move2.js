module.exports = {
    commands: 'move moderation',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.send('Moving to the `Moderation` Category, Please Wait Patiently...')
        message.channel.setParent('810032466814828554')
        message.channel.send('Successfully Moved The Thread Under the `Moderation` Category!')
    },
    permissions: 'KICK_MEMBERS',
  }