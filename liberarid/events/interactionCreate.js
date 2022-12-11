const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("../config.json")
const db = require("quick.db")
const mysql2 = require("mysql2")


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client, args) {

        if (interaction.isButton()) {


            if (interaction.customId.startsWith('r')) {

                let con = mysql2.createPool({
                    host: '',
                    user: '',
                    password: '',
                    database: '',
                });

                let id = interaction.user.id

                const reset = interaction.guild.channels.cache.get(config.logreset);
                let sql = `UPDATE vrp_users SET whitelisted = '0' WHERE discord = '${id} '`
                let sql2 = `UPDATE vrp_users SET discord = '0' WHERE discord = '${id} '`

                con.query(sql, function (err, result) {
                    if (err) throw err;

                    con.query(sql2, function (err, result) {
                        if (err) throw err;

                        let aprovado = new Discord.MessageEmbed()
                            .setDescription(`🔄 | ${interaction.user} O seu **ID** foi resetado com sucesso, envie seu id novamente para ser liberado`)
                            .setColor('#2f3136')

                        let embed = new Discord.MessageEmbed()
                            .setDescription(`🔄 | ${interaction.user} \`${interaction.user.id}\` Resetou seu **ID** com sucesso`)
                            .setColor('#2f3136')
                            
                        interaction.reply({ embeds: [aprovado], ephemeral: true })

                        reset.send({ embeds: [embed] })

                    })
                })
            }
        }
    }
}