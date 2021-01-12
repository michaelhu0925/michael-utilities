module.exports = client => {
    client.on('guildMemberAdd', member => {
        console.log(member)
    })
}