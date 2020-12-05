const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const poll = require('./poll')
const welcome = require('./welcome')



client.on('ready', () => {
    console.log('The client is ready!')
    
    welcome(client)
    
    
    command(client, 'help', (message) => {
        message.channel.send(`   
    These are my supported commands:

    **-help/h**                     = _Displays the help menu_
    **-ping**                          = _Ping the bot_
    **-life**                            = _tells you about your life_
    **-cc/clearchannel**    = _purge channel_
    **-kick/yeet**                = _kick members_
    **-ban**                           = _ban members_
    **-serverinfo/si**         = _Server info_
    **-poll**                           = _do a poll on the previous message_
     `)
    })


    poll(client)


    command(client, 'life', (message) => {
        message.channel.send('**You dont have a life**')
    })

    command(client, 'ban', message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('BAN_MEMBERS')
         ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.ban()
                message.channel.send(`${tag} User has been banned!`)

                } else {
                    message.channel.send(`${tag} Please specify someone to ban.`)
            }
         } else {
             message.channel.send(`${tag} Know your place retard.`)
         }  
    })


    command(client, ['kick', 'yeet'], message => {
        const { member, mentions } = message

        const tag = `<@${member.id}>`

        if (
            member.hasPermission('ADMINISTRATOR') ||
            member.hasPermission('KICK_MEMBERS')
         ) {
            const target = mentions.users.first()
            if (target) {
                const targetMember = message.guild.members.cache.get(target.id)
                targetMember.kick()
                message.channel.send(`${tag} Yeeeeeeeeeet!`)

                } else {
                    message.channel.send(`${tag} Please specify someone to kick.`)
            }
         } else {
             message.channel.send(`${tag} Know your place you idiot.`)
         }  
    })

    command(client, ['serverinfo', 'si'], (message) => {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server info for "${name}"`)
            .setThumbnail(icon)
            .addFields(
            {
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
                name: 'Afk Timeout',
                value: afkTimeout / 60,
            }
        )
            message.channel.send(embed)
    })

    const { prefix } = config

    client.user.setPresence({
        activity:{
            name: `"Use ${prefix}help" for help`,
        },
    })

    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
                })
            }
        })
    command(client, 'status', message => {
        const content = message.content.replace('-status', '')
        //"!status hellow world" -> "hello world"

        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })
})

client.login(process.env.DJS_TOKEN)