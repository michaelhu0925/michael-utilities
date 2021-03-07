module.exports = {
    commands: 'mine',
    permissionError: 'You do not have permissions to run this command!',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        const tag = `<@${member.id}>`

        message.channel.send(`${tag} Thanks for claiming this thread! This will count as your weekly ModMail Claims! (**No One Else Will Be Allowed To Response To This Thread, excluding Admins**)`)
    },
  }