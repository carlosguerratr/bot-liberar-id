const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("../config.json")
const db = require("quick.db")
const mysql2 = require("mysql2")

module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client, args) {

        let con = mysql2.createPool({
            host: '',
            user: '',
            password: '',
            database: '',
        });

        let id = member.user.id

        
        let sql = `UPDATE vrp_users SET whitelisted = '0' WHERE discord = '${id} '`

        con.query(sql, function (err, result) {
            if (err) throw err;


            let guild =  client.guilds.cache.get(config.iddoservirdor)
            let channel =  client.channels.cache.get(config.logsairdc); 
            if (guild != member.guild) {
                return console.log("BY ❤️");
            } else {
                let embed =  new Discord.MessageEmbed()
                    .setDescription(`💔 | ${member.user.username} \`${member.user.id}\` Teve sua whitelist removida após sair do discord`)
                    .setFooter("BY ❤️", "https://cdn.discordapp.com/attachments/953748242129117193/969048304358920222/20220427_215646.gif")
                    .setTimestamp();

                channel.send({ embeds: [embed] });
            }
        })
    }
}