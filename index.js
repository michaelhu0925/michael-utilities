const path = require('path')
const fs = require('fs')
const discord = require('discord.js')
const client = new discord.Client()

const config = require('./config.json')
const privateMessage = require('./private-message')
const command = require('./command')
const poll = require('./poll')
const version = 'Version: 1.2 Beta'
const eval = require('./eval')

client.on('ready', async () => {
    console.log('All prepared, my boss')

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)
  
    const readCommands = (dir) => {
      const files = fs.readdirSync(path.join(__dirname, dir))
      for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if (stat.isDirectory()) {
          readCommands(path.join(dir, file))
        } else if (file !== baseFile) {
          const option = require(path.join(__dirname, dir, file))
          commandBase(client, option)
        }
      }
    }
  
    readCommands('commands')

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

    command(client, 'status', message=> {
        const content = message.content.replace('>status ', '')
        if (message.member.hasPermission('ADMINISTATOR')) {
            client.user.setPresence({
                activity: {
                    name: content,
                    type: 2,
                },
            })
        } else {
            message.reply('You do not have permissions to run this command')
            return
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
                name: 'Level Roles',
                value: '<@&734244543049891880>: Get access to <#734293466506330113>\ <@&734246143491309640> Ability to post images!\ <@&734250842269679627> Get access to <#734287527866794066> and talk about your favourite game!'
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

    eval(client)
})

client.login('NzkzNjk5NTAwODU0MDgzNjA1.X-wEQw.8mUIF10cRGCUABKUSt6cQaeDrUM')