module.exports = {
    commands: 'move management',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.send('Moving to the `Management` Category, Please Wait Patiently...')
        message.channel.setParent('810032281343229962')
        message.channel.send('Successfully Moved The Thread Under the `Management` Category!')
    },
    permissions: 'KICK_MEMBERS',
  }