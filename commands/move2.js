module.exports = {
    commands: 'move moderation',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        message.channel.send('Moving to the `Moderation` Category, Please Wait Patiently...')
        message.channel.setParent('810032466814828554')
        message.channel.send('Successfully Moved The Thread Under the `Moderation` Category!')
        message.channel.send('<@&810858336714620979> **New Thread Has Been Moved Under The `Moderation` Category!**')
    },
  }