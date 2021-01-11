module.exports = client => {
    const channelIds = [
        '740070068628619286', //new content
        '732067496315846707',
    ]

    const addReactions = message => {
        message.react('👍')

        setTimeout(() => {
            message.react('👎')
        }, 750);

        client.on('message', message => {
            if (channelIds.includes(message.channel.id)) {
                addReactions(message)
            }
        })
    }
}