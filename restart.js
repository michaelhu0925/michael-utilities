module.exports = (client, message, args) => {
    if (message.author.id !== '696211031579688971') {
        return message.channel.send('You do not have permission to use this command!')
    }
    await message.channel.send('Restarting Bot...')
    process.exit();
}