module.exports = {
    commands: 'mine',
    permissionError: 'You do not have permissions to run this command!',
    callback: (message, arguments, text) => {
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        const place = bot.channels.cache.find(channel => channel.id === "818810812096315453");

        message.channel.send(`${tag} Thanks for claiming this thread! This will count as your weekly ModMail Claims! (**No One Else Will Be Allowed To Response To This Thread, excluding Admins**)`);
        place.send("Someone Have Claimed A ModMail Thread!");
    },
  }