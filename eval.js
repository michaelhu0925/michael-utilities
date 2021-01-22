const command = require('./command')
const ownerId = '696211031579688971'

module.exports = client => {
    command(client, 'eval', message => {
        const { member, channel, content } = message

        if (member.id === ownerId) {
            const result = eval(content.replace('>eval', ''))
            message.channel.send(result)
        } else {
            message.channel.send('You do not have permission to run this command!')
        }
    })
}