module.exports = {
    commands: 'move general',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.send('Moving to the `General` Category, Please Wait Patiently...')
        message.channel.setParent('747389443840671776')
        message.channel.send('Successfully Moved The Thread Under the `General` Category!')
        message.channel.send('@here **New Thread Has Been Moved Under The `General` Category!**')
    },
  }