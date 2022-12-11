const Discord = require("discord.js")
const mysql2 = require('mysql2') //npm i mysql2


module.exports = {
    name: "rporte",
    description: "rporte",
    aliases: ["rporte"],
    run: async (client, message, args) => {

        let id = args[0]
        //let motivo = args.slice(1).join(" ")

        //if (!motivo) return message.reply(`🚫| ${message.author}, você não mencionou o motivo.`)
        if (!id) return message.reply(`🚫| ${message.author}, você não mencionou o ID do membro.`)

        if (!message.member.roles.cache.has('1021158863757643908')) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);

        // [SQL] Estabelecendo a conexao:
        let con = mysql2.createPool({
            host: '190.102.42.163', // IP do Banco de Dados
            user: 'bairro', // Usuario do Banco de Dados
            password: '147258', // Senha do Banco de Dados
            database: 'zirix', // Nome da sua database
        });

        // [SQL-2] Alterando os dados e liberando o ID:
        let sql = `UPDATE vrp_user_identities SET gunlicense = '0' WHERE user_id = '${id}'`

        // [SQL-Result] Resultado da conexao:
        con.query(sql, function (err, result) {
            if (err) throw err;

            let embed_resultado = new Discord.MessageEmbed()
            .setAuthor(`Operação Concluída`)
            .setDescription(`Comando: **!rporte**`)
            .addField(`Porte removido do **ID**:`, `${id}`)
            .addField(`Responsável:`, `${message.author}`)
            //.addField(`Motivo:`, `${motivo}`)
            //.setFooter(`Made by rafa`)

            message.channel.send({ embeds: [embed_resultado]})

        })
    }
}