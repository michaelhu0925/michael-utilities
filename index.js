const discord = require('discord.js')
const client = new discord.Client()

const config = require('./config.json')
const privateMessage = require('./private-message')
const command = require('./command')

client.on('ready',() => {
    console.log('All prepared, my boss')

    const embed = new discord.MessageEmbed()
        .setTitle('Help')
        .setDescription('**#Adminatrator Only**')
        .setColor('#58b9ff')
        .addFields({
            name: 'ping',
            value: 'Pong!',
            inline: false
        },
        {
            name: 'servers',
            value: 'To check the servers bot is in',
            inline: false
        },
        {
            name: 'clearchannel/cc',
            value: 'Clear all of the messages in a channel',
            inline: false
        },
        {
            name: 'status',
            value: 'Change the status of the bot',
            inline: false
        },
        {
            name: 'update',
            value: 'Check the latest bot update or updates that is going to get pushed shortly.'
        },
        {
            name: 'createtextchannel',
            value: 'Create a text channel',
            inline: false
        },
        {
            name: 'createvoicechannel',
            value: 'Create a voice channel',
            inline: false
        }
        )
        .setFooter('Made By Michaelhu0925#0925')
        .setThumbnail('https://cdn.discordapp.com/avatars/696211031579688971/499c9f5121d623e5db56c0583e5a4309.png?size=128')

    privateMessage(client, 'help', embed) 

    command(client, ['ping', 'pong'], message => {
        message.channel.send('Ping, pong!')
        
    })

    command(client, 'servers', (message) => {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTATOR')) {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results)
            })
        }
    })

    command(client, 'status', message=> {
        const content = message.content.replace('>status ', '')
        if (message.member.hasPermission('ADMINISTATOR')) {
            client.user.setPresence({
                activity: {
                    name: content,
                    type: 2,
                },
            })
        }
    })

    command(client, 'createtextchannel', (message) => {
        const name = message.content.replace('>createtextchannel ', '')
        if (message.member.hasPermission('ADMINISTATOR')){
            message.guild.channels
        .create(name, {
            type: 'text'
        })
        .then(channel => {
            console.log(channel)
        })
        }
    })

    command(client, 'createvoicechannel', (message) => {
        const name = message.content.replace('>createvoicechannel ', '')
        if (message.member.hasPermission('ADMINISTATOR')){
            message.guild.channels.create(name, {
                type: 'voice'
            })
            .then(channel => {})
        }
    })

    command(client, 'help', (message) => {
        console.log(message.author)

        message.channel.send(embed)
    })

    command(client, 'serverinfo', message => {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const embed = new discord.MessageEmbed()
            .setTitle(`${name}`)
            .setThumbnail(icon)
            .setColor('#58b9ff')
            .addFields({
                name: 'Region',
                value: region,
            },
            {
                name: 'Members',
                value: memberCount,
            },
            {
                name: 'Owner',
                value: owner.user.tag,
            },
            {
                name: 'AFK Timeout',
                value: afkTimeout / 60,
            }
        )

        message.channel.send(embed)
    })

    command(client, 'update', message => {
        const embed = new discord.MessageEmbed()
            .setTitle('Bot Update:')
            .setDescription('Likely adding a modmail feature in the next coming update! #hype')
            .setFooter('Made By Michaelhu0925#0925')
            .setThumbnail('https://cdn.discordapp.com/avatars/696211031579688971/499c9f5121d623e5db56c0583e5a4309.png?size=128')
            .setColor('#58b9ff')

        message.channel.send(embed)
    })

    

    command(client, ['ban', 'b'], message => {
        const { member, mentions } = message

        if (member.hasPermission('ADMIN') ||
         member.hasPermission('BAN_MEMBER')) {

        } else {
            message.channel.send(`<@${member.id}> Your do not have permission to use this command.`)
        }
    })
})

client.login(process.env.token)