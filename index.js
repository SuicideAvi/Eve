const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const mongo = require('./mongo')
const poll = require('./poll')
const welcome = require('./welcome')


client.on('ready', async () => {
    console.log('The client is ready!')
    
    await mongo().then((mongoose) => {
        try {
            console.log('Connected to mongo!')
        } catch(e) {    

        } finally {
            mongoose.connection.close()
        }
    })
    command(client, 'help', (message) => {
        message.channel.send(`   
    _These are my supported commands:_

    **-help** = _(Displays the help menu)_
    **-ping** = _(Ping the bot)_
    **-life** = _(Tells you about your life)_
    **-cc/clearchannel** = _(Purge channel)_
    **-kick** = _(Kick member)_
    **-ban** = _(Ban member)_
    **-serverinfo/si** = _(Shows the server info)_
    **-poll** = _(Make a poll on previous message)_
     `)
    })


    poll(client)
    welcome(client)

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
                message.channel.send(`${targetMember} has been banned!`)

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
                message.channel.send(`${targetMember} Sayonara. </3`)

                } else {
                    message.channel.send(`${tag} Please specify someone to kick.`)
            }
         } else {
             message.channel.send(`${tag} Know your place idiot.`)
         }  
    })

        
    command(client, ['serverinfo', 'si'], (message) => {
        const { guild } = message

        const { name, region, memberCount, owner, createdAt } = guild
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
                name: 'Found',
                value: createdAt,
            }
        )
            message.channel.send(embed)
    })

    command(client, ['memberinfo', 'mi'], (message) => {
        const { member, mentions } = message


        const { id, joinedAt } = member

        const embed = new Discord.MessageEmbed()
            .setTitle(`Information for "${member.id}"`)
            .addFields(
            {
                name: 'Member Info',
                value: id,
            },
            {
                name: 'Joined',
                value: joinedAt,
            }
        )
            message.channel.send(embed)
    })


    const { prefix } = config

    client.user.setPresence({
        activity:{
            name: `"${prefix}help"`,
        },
    })

    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
                })
            } else {
                message.channel.send(`You can't! :) `)
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