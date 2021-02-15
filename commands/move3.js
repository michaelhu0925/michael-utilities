module.exports = {
    commands: 'move partnership',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.send('Moving to the `Partnership` Category, Please Wait Patiently...')
        message.channel.setParent('810032640921042985')
        message.channel.send('Successfully Moved The Thread Under the `Partnership` Category!')
        message.channel.send('<@&810858376543469600> **New Thread Has Been Moved Under The `Partnership` Category!**')
    },
  }