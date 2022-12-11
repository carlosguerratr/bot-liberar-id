const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("../config.json")
const db = require("quick.db")
const mysql2 = require("mysql2")


module.exports = {
    name: 'messageCreate',
    async execute(message, client, args) {

        if (message.channel.id === config.canalliberacao) {
            if (!message.content.includes("|")) {
                if (message.author.bot) return;

                let embed = new Discord.MessageEmbed()
                    .setDescription(`\`${message.author.username}\`**Você utilizou o modelo errado, utilize: ID | Nome Sobrenome**`)
                    .setColor('#f40303')

                message.delete()
                return message.channel.send({ embeds: [embed] }).then(msg => { setTimeout(() => msg.delete(), 6000) })

            } else {

                let con = mysql2.createPool({
                    host: '',
                    user: '',
                    password: '',
                    database: '',
                });

                let id = message.content.slice(0)
                let id2 = message.author.id
                con.query(`SELECT * FROM vrp_users WHERE id = '${id}'`, function (err, result, fields) {
                    white = result[0].whitelisted;
                    let emebd = new Discord.MessageEmbed()
                        .setDescription(`\`${message.author.username}\` **Este ID já esta aprovado em outro ID de discord**`)
                        .setColor("#f40303")

                    if (white == 1) {
                        message.delete()

                        return message.channel.send({ embeds: [emebd], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 6000) })
                    }

                        let ban = message.content.slice(0)
                        con.query(`SELECT * FROM vrp_users WHERE id = '${id}'`, function (err, result, fields) {
                            white = result[0].banned;
                            let emebd = new Discord.MessageEmbed()
                                .setDescription(`\`${message.author.username}\` **Este ID está **BANIDO** do servidor.**`)
                                .setColor("#f40303")

                            if (white == 1) {
                                message.delete()

                                return message.channel.send({ embeds: [emebd], ephemeral: true }).then(msg => { setTimeout(() => msg.delete(), 6000) })
                            }


                            let id = message.content.slice(0)
                            let id2 = message.author.id
                            console.log(id)
                            console.log(id2)

                            let sql = `UPDATE vrp_users SET whitelisted = '1' WHERE id = '${id}'`
                            let sql2 = `UPDATE vrp_users SET discord = '${message.author.id}'`
                            con.query(sql, function (err, result) {
                                if (err) throw err;

                                con.query(sql2, function (err, result) {
                                    if (err) throw err;

                                    let aprovado = new Discord.MessageEmbed()
                                        .setDescription(`☑️ **${message.author.username}** Whitelist Liberada , Seja Bem-Vindo ao ${message.guild.name}`)
                                        .setColor("#006400")
                                    message.delete()
                                    message.channel.send({ embeds: [aprovado], ephemeral: true })

                                    setTimeout(() => {
                                        try {
                                            message.channel.bulkDelete(1)
                                        } catch (er) {
                                            console.log(er)
                                        }
                                    }, 6000)

                                    message.guild.members.cache.get(message.author.id).setNickname(`${message.content}`)
                                    message.member.roles.remove(config.cargorem)
                                    message.member.roles.add(config.cargoadd)

                                    const logwl = message.guild.channels.cache.get(config.logwl);

                                    const embed = new Discord.MessageEmbed()
                                        .setDescription(`☑️ ${message.author} \`${message.author.id}\` Foi liberado syncado com o id  \`${id}\``)
                                        .setColor('#2f3136')

                                    logwl.send({ embeds: [embed] })

                                })
                            })
                        })
                    })
                }
            }
        }
    }


