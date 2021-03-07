module.exports = {
    commands: 'restart',
    permissionError: 'You do not have permissions to run this command!',
    callback: (message, arguments, text) => {
        const tag = `<@${member.id}>`

        message.channel.send('>s test test')
        message.channel.send(`${tag} All snippets have been reloaded and restarted!`)
    },
  }