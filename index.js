const Discord = require('discord.js')
const client = new Discord.Client()

// const config = require('./config.json')
const command = require('./command')
const poll = require('./poll')



client.on('ready', () => {
    console.log('The client is ready!')

    command(client, ['help','h'], (message) => {
        const embed = new Discord.MessageEmbed().setTitle(`      
    These are my supported commands:
    **-help/h** = Displays the help menu
    **-ping** = Ping the bot
    **-cc/clearchannel** = purge channel
    **-kick/yeet** = kick members
    **-ban** = ban members
    **-serverinfo/si** = Server info
     `)
     .setFooter('Its not like i wanted to help you, hmph!')
     message.channel.send(embed)
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