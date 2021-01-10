const discord = require('discord.js')
const client = new discord.Client()

let botRole = ['730718555506475110']
let modRole = ['742342356463910922', '741510597832736839', '787988693896921108', '741511048632336425'];

const config = require('./config.json')
const privateMessage = require('./private-message')
const command = require('./command')

let prefix = process.env.PREFIX;
let guildID = process.env.GUILD;
let log = process.env.LOG;

client.on("message", async message => {
    if(message.channel.type === "dm"){
      if(message.author.bot) return;
      const auW = new Discord.MessageEmbed()
      .setColor('RED')
      .setTimestamp()
      .setTitle('**Error!**')
      .setDescription('You can\'t mention that')
      
      if(message.content.includes("@everyone") || message.content.includes("@here")) return message.author.send(auW)
      var table = new db.table("Tickets");
      let active = await table.get(`support_${message.author.id}`)
      let guild = client.guilds.cache.get(guildID);
      let channel, found = true;
      let user = await table.get(`isBlocked${message.author.id}`);
      if(user === true || user === "true") return message.react("❌");
      if(active === null){
        active = {};
        let modrole = guild.roles.cache.get(modRole);
        let everyone = guild.roles.cache.get(guild.roles.everyone.id);
        let bot = guild.roles.cache.get(botRole);
        await table.add("ticket", 1)
        let actualticket = await table.get("ticket");
        channel = await guild.channels.create(`${message.author.username}-${message.author.discriminator}`, { type: 'text', reason: `Modmail created ticket #${actualticket}.` });
        channel.setParent('747389443840671776');
        channel.setTopic(`#${actualticket} | ${prefix}complete to close this ticket | Modmail for ${message.author.username}`)
        channel.createOverwrite(modrole, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true
        });
        channel.createOverwrite(everyone, {
          VIEW_CHANNEL: false
        });
        channel.createOverwrite(bot, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true,
          MANAGE_MESSAGES: true
        })
        let author = message.author;
        const newTicket = new Discord.MessageEmbed()
          .setColor("GREEN").setAuthor(author.tag, author.avatarURL({dynamic: true}))
          .setTitle("**New ticket created**")
          .addField("Ticket Number", `#${actualticket}`, true)
          .addField("Channel", `<#${channel.id}>`, true)
        if(log){
          client.channels.cache.get(log).send({embed: newTicket})
        }
        const newChannel = new Discord.MessageEmbed()
          .setColor("BLUE").setAuthor(author.tag, author.avatarURL())
          .setDescription(`Ticket #${actualticket} created.\nUser: ${author}\nID: ${author.id}`)
          .setTimestamp()
        
        await client.channels.cache.get(channel.id).send({embed:newChannel});
        const kwdjw = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTimestamp()
        .setTitle('**Ticket Created**')
        .setDescription(`<@${author.id}>, your ticket #${actualticket} has been created`)
        
        message.author.send(kwdjw);
        active.channelID = channel.id;
        active.targetID = author.id;
      }
      channel = client.channels.cache.get(active.channelID);
      var msg = message.content;
      var whatWeWant = msg.replace("@everyone", "[everyone]").replace("@here", `[here]`) // idk if that's useful since we're blocking mentions
      // fix (#6)
      var isPaused = await table.get(`suspended${message.author.id}`);
      var isBlocked = await table.get(`isBlocked${message.author.id}`);
      if(isPaused === true){
        const pwus = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setDescription('Your ticket is currently paused! I\'ll message you back when the support team unpause it')
        
          return message.channel.send(pwus);
      }
      if(isBlocked === true) return; // the user is blocked, so we're just gonna move on.
      if(message.attachments.size > 0){
        
        
        let attachment = new Discord.MessageAttachment(message.attachments.first().url)
        
        const e = new Discord.MessageEmbed()
        .setColor(0x00FFFF)
        .setTimestamp()
        .setTitle(`**Message from ${message.author.tag}**`)
        .setDescription(whatWeWant, {files: [message.attachments.first().url]})
        
        channel.send(e);
      } else {
        const e = new Discord.MessageEmbed()
        .setColor(0x00FFFF)
        .setTimestamp()
        .setTitle(`**Message from ${message.author.tag}**`)
        .setDescription(whatWeWant)
        
        channel.send(e);
      }
      await table.set(`support_${message.author.id}`, active);
      await table.set(`supportChannel_${channel.id}`, message.author.id);
      return;
    }
    if(message.author.bot) return;
    var table = new db.table("Tickets");
    var support = await table.get(`supportChannel_${message.channel.id}`);
    if(support){
      var support = await table.get(`support_${support}`);
      let supportUser = client.users.cache.get(support.targetID);
      if(!supportUser) return message.channel.delete();
      
      // reply (with user and role)
      if(message.content.startsWith(`${prefix}reply`)){
        var isPause = await table.get(`suspended${support.targetID}`);
        let isBlock = await table.get(`isBlocked${support.targetID}`);
        const pwusww = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setDescription('This ticket already paused, unpause it to continue')
        const pwus = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setDescription('The user is blocked, unblock them to continue or close the ticket')
        
        if(isPause === true) return message.channel.send(pwusww);
        if(isBlock === true) return message.channel.send(pwus);
        var args = message.content.split(" ").slice(1)
        let msg = args.join(" ");
        message.react("✅");
        if(message.attachments.size > 0){
          let attachment = new Discord.MessageAttachment(message.attachments.first().url)
          const e = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTimestamp()
        .setTitle(`**Message from ${message.author.tag}**`)
        .setDescription(`${msg}`, { files: [message.attachments.first()] })
          return supportUser.send(e);
          message.channel.send(e);
        
        
        } else {
          const e = new Discord.MessageEmbed()
        .setColor('YELLOW')
        .setTimestamp()
        .setTitle(`**Message from ${message.author.tag}**`)
        .setDescription(msg)
          return supportUser.send(e);
          message.channel.send(e);
          
        }
      };
      
      // anonymous reply
      if(message.content.startsWith(`${prefix}a-reply`)){
        var isPause = await table.get(`suspended${support.targetID}`);
        let isBlock = await table.get(`isBlocked${support.targetID}`);
        const pwusww = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setDescription('This ticket already paused, unpause it to continue')
        const pwus = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setDescription('The user is blocked, unblock them to continue or close the ticket')
        if(isPause === true) return message.channel.send(pwusww);
        if(isBlock === true) return message.channel.send(pwus);
        var args = message.content.split(" ").slice(1)
        let msg = args.join(" ");
        message.react("✅");
        const pwwus = new Discord.MessageEmbed()
        .setColor(0x7289da)
        .setTimestamp()
        .setTitle(`**Message from ${message.author.tag}**`)
        .setDescription(msg)
        
        return supportUser.send(pwwus);
      };
      
      // print user ID
      if(message.content === `${prefix}id`){
        return message.channel.send(`User's ID is **${support.targetID}**.`);
      };
      
      // suspend a thread
      if(message.content === `${prefix}pause`){
        var isPause = await table.get(`suspended${support.targetID}`);
        const pwusww = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setFooter(`${client.user.username} | Powered by LOA Network`)
        .setDescription('This ticket already paused, unpause it to continue')
        
        if(isPause === true || isPause === "true") return message.channel.send(pwusww);
        await table.set(`suspended${support.targetID}`, true);
        var suspend = new Discord.MessageEmbed()
        .setDescription(`This thread has been **locked** and **suspended**. Do \`${prefix}continue\` to cancel.`)
        .setTimestamp()
        .setColor("YELLOW")
        message.channel.send({embed: suspend});
        return supportUser.send("Your ticket has been paused. We'll send you a message when we're ready to continue.")
      };
      
      // continue a thread
      if(message.content === `${prefix}continue`){
        var isPause = await table.get(`suspended${support.targetID}`);
        if(isPause === null || isPause === false) return message.channel.send("This ticket was not paused.");
        await table.delete(`suspended${support.targetID}`);
        var c = new Discord.MessageEmbed()
        .setDescription("This thread has been **unlocked**.")
        .setColor('GREEN').setTimestamp()
        message.channel.send(c);
        
        const wdw = new Discord.MessgageEmbed()
        .setColor(0x7289DA)
        .setTimestamp()
        .setTitle('**Ticket Continued**')
        .setDescription('Your ticket isn\'t paused anymore, we\'re to continue!')
        
        return supportUser.send(wdw);
      }
      
      // block a user
      if(message.content.startsWith(`${prefix}block`)){
      var args = message.content.split(" ").slice(1)
        let reason = args.join(" ");
        if(!reason) reason = `Unspecified.`
        let user = client.users.fetch(`${support.targetID}`); // djs want a string here
        const blocked = new Discord.MessageEmbed()
          .setColor("RED").setAuthor(user.tag)
          .setTitle("**User blocked**")
          .addField("Channel", `<#${message.channel.id}>`, true)
          .addField("Reason", reason, true)
        if(log){
          client.channels.cache.get(log).send({embed: blocked})
        }
        let isBlock = await table.get(`isBlocked${support.targetID}`);
        
        const wdw = new Discord.MessgageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setDescription('The user is already blocked')
        if(isBlock === true) return message.channel.send(wdw)
        await table.set(`isBlocked${support.targetID}`, true);
        var c = new Discord.MessageEmbed()
        .setDescription("The user can not use the modmail anymore; they have been blocked. You may now close the ticket or unblock them to continue")
        .setColor("RED").setTimestamp()
        message.channel.send({embed: c});
        return;
      }
      
      // unblock a user
      if(message.content.startsWith(`${prefix}unblock`)){
        let isBlock = await table.get(`isBlocked${support.targetID}`);
        const w = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setTitle('**Error!**')
        .setDescription('User wasn\'t blocked')
        
        if(isBlock === false || !isBlock || isBlock === null) return message.channel.send("User wasn't blocked")
        let user = client.users.fetch(`${support.targetID}`); // djs want a string here
        const unBlock = new Discord.MessageEmbed()
          .setColor("RED").setAuthor(user.tag)
          .setTitle("**User Unblocked**")
        if(log){
          client.channels.cache.get(log).send({embed: unBlock})
        }
        await table.delete(`isBlocked${support.targetID}`);
        var c = new Discord.MessageEmbed()
        .setDescription("The user has successfully been unblocked!")
        .setColor("GREEN").setTimestamp()
        message.channel.send({embed: c});
        return
      }
      
      // complete
      if(message.content.toLowerCase() === `${prefix}complete`){
          var embed = new Discord.MessageEmbed()
          .setAuthor('The bot is in process of closing this ticket, Please be patient...')
          .setDescription(`This ticket will be deleted in **20** seconds...\n:lock: This thread has been locked and closed.`)
          .setColor("RED").setTimestamp()
          message.channel.send({embed: embed})
          var timeout = 20000
          setTimeout(() => {end(support.targetID);}, timeout)
        }
        async function end(userID){
          table.delete(`support_${userID}`);
          let actualticket = await table.get("ticket");
          message.channel.delete()
          const ed = new Discord.MessageEmbed()
          .setColor(0x7289DA)
          .setTimestamp()
          .setTitle('**Ticket Closed**')
          .setDescription(`Your ticket #${actualticket} has been closed! If you wish to open a new ticket, message me`)
          
          return supportUser.send(ed);
        }
      };
  })
  
  async function unblock(id){
    let table = new db.table("Tickets");
    await table.delete(`isBlocked${id}`);
  }

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
            value: 'Check the latest bot update'
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

    command(client, ['kick', 'c'], message => {
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
                message.channel.send(`${tag} Please specify someone to ban.`)
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
            .setFooter('Made By Michaelhu0925#0925')
            .setColor('#58b9ff')

        message.channel.send(embed)
    })
})

client.login(process.env.token)