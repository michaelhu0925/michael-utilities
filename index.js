const discord = require('discord.js')
const client = new discord.Client()

const config = require('./config.json')
const privateMessage = require('./private-message')
const command = require('./command')
const poll = require('./poll')
const version = 'Version: 1.1'

client.on('ready', async () => {
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
            value: 'Check the latest bot update',
            inline: false
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
        },
        {
            name: 'roleinfo/ri',
            value: 'Look at the information for every role',
            inline: false
        },
        {
            name: 'version',
            value: 'Check the bot version',
            inline: false
        },
        {
            name: 'ban/b',
            value: 'Bans a member',
            inline: false
        },
        {
            name: 'kick/k',
            value: 'Kicks a member',
            inline: false
        }
        )
        .setFooter(`Made By Michaelhu0925#0925 ${version}`)
        .setTimestamp()
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

    command(client, ['createtextchannel', 'ctc'], (message) => {
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

    command(client, ['createvoicechannel', 'cvc'], (message) => {
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

    command(client, ['serverinfo', 'si'], message => {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const embed = new discord.MessageEmbed()
            .setTitle(`${name}`)
            .setThumbnail(icon)
            .setColor('#58b9ff')
            .setFooter(`Made By Michaelhu0925#0925 ${version}`)
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
            .setFooter(`Made By Michaelhu0925#0925 ${version}`)
            .setThumbnail('https://cdn.discordapp.com/avatars/696211031579688971/499c9f5121d623e5db56c0583e5a4309.png?size=128')
            .setColor('#58b9ff')
            .setTimestamp()

        message.channel.send(embed)
    })

    

    command(client, ['ban', 'b'], message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (member.hasPermission('ADMIN') ||
         member.hasPermission('BAN_MEMBER')) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${targetMember} has been banned successfully.`)
            } else {
                message.channel.send(`${tag} Please specify someone to ban.`)
            }
        } else {
            message.channel.send(`${tag} Your do not have permission to use this command.`)
        }
    })

    command(client, ['kick', 'k'], message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (member.hasPermission('ADMIN') ||
         member.hasPermission('KICK_MEMBER')) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${targetMember} has been kicked successfully.`)
            } else {
                message.channel.send(`${tag} Please specify someone to kick.`)
            }
        } else {
            message.channel.send(`${tag} Your do not have permission to use this command.`)
        }
    })

    command(client, ['copyright','shoutout'], message => {
        const embed = new discord.MessageEmbed()
            .setTitle('Shoutouts:')
            .addFields({
                name: 'Server Owner:',
                value: 'Michaelhu0925#0925',
                inline: false
            },
            
            {
                name: 'Server Icon:',
                value: 'Xrana#5900',
                inline: false
            }
            )
            .setThumbnail('https://cdn.discordapp.com/avatars/696211031579688971/499c9f5121d623e5db56c0583e5a4309.png?size=128')
            .setFooter(`Made By Michaelhu0925#0925 ${version}`)
            .setTimestamp()
            .setColor('#58b9ff')
            

        message.channel.send(embed)
    })

    command(client, ['ri','roleinfo','rolesinfo'], message => {
        const embed = new discord.MessageEmbed()
            .setTitle('Role Info')
            .setDescription('Here are all the roles that you can get in the server:')
            .addFields({
                name: '<@&734244543049891880>: Get access to <#734293466506330113>'
            })
            .setFooter(`Made By Michaelhu0925#0925 ${version}`)
            .setTimestamp()
            .setColor()

        message.channel.send(embed)
    })

    poll(client)

    command(client, 'version', message => {
        const embed = new discord.MessageEmbed()
        .setTitle('Version:')
        .setDescription(`${version}`)
        .setTimestamp()
        .setColor()

        message.channel.send(embed)
    })
})

client.login(process.env.token)