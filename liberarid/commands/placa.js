const Discord = require("discord.js");

const mysql = require('mysql2'); 

const connection = mysql.createPool({ //Info da database, para conectar
  connectionLimit : 10,
  host: '190.102.42.163', // IP do Banco de Dados
  user: 'bairro', // Usuario do Banco de Dados
  password: '147258', // Senha do Banco de Dados
  database: 'zirix', // Nome da sua database
});


module.exports = {
    name: 'placa',

    run: async (client, message, args, member) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);

    var id = args[0]
    var placa = args[1]

    if (!id) {
        let embed = new Discord.MessageEmbed()

            .setColor("#303136")
            .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu o ID!```")

            return message.channel.send({embeds:[embed]})
    }

    if (isNaN(id)) {
        let embed = new Discord.MessageEmbed()

            .setColor("#303136")
            .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")

            return message.channel.send({embeds:[embed]})

    }

    if (!placa) {
        let embed = new Discord.MessageEmbed()

            .setColor("#303136")
            .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu a PLACA!```")

            return message.channel.send({embeds:[embed]})
    }

    if (placa.length !== 8) {
        let embed = new Discord.MessageEmbed()

            .setColor("#303136")
            .addField(`**Ocorreu um erro.**`, "```yaml\nErro: A placa só pode conter exatos 8 dígitos!```")

            return message.channel.send({embeds:[embed]})
    }
//registration




      connection.query(`UPDATE vrp_user_identities SET registration = '${placa}' WHERE user_id = '${id}'`, (err, rows) => { 

            let embed = new Discord.MessageEmbed()

                .setDescription(`:white_check_mark: | O ID **${id}** Teve a placa alterada para **${placa}**.`)
                .setColor("#303136")

                return message.channel.send({embeds:[embed]})

        })
  
    
        

}
}