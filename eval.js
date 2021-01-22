const command = require('./command')
const ownerId = '696211031579688971'

module.exports = client => {
    command(client, 'eval', message => {
        const { member, channel } = message

        if (member.id === ownerId) {
            console.log('works')
        } else {
            console.log("doesn't work")
        }
    })
}