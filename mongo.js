const monsoose = require('mongoose')
const { mongoPath } = require('./config.json')

module.exports = async () => {
    await monsoose.connect(mongoPath)
    return monsoose
}