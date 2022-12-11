const Discord = require("discord.js")
const mysql = require('mysql2'); 
module.exports = {
    name: "addcar",
    description: "addcar",
    aliases: ["addcar"],
    run: async (client, message, args) => {

        // [SQL] Estabelecendo a conexao:
        const connection = mysql.createConnection({ 
            host: '190.102.42.163', // IP do Banco de Dados
            user: 'bairro', // Usuario do Banco de Dados
            password: '147258', // Senha do Banco de Dados
            database: 'zirix', // Nome da sua database
        });

 
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);
        var id = args[0]
        var carro = args[1]
    
        if (!id) {
            let embed = new Discord.MessageEmbed()
    
                .setColor("#85dac0")
                .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu o ID!```")
    
            return message.channel.send({embeds:[embed]})
        }
    
        if (isNaN(id)) {
    
            let embed = new Discord.MessageEmbed()
    
                .setColor("#85dac0")
                .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu um id inválido!```")
    
                return message.channel.send({embeds:[embed]})
    
        }
    
        if (!carro) {
            let embed = new Discord.MessageEmbed()
    
                .setColor("#85dac0")
                .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu o nome do carro!```")
    
                return message.channel.send({embeds:[embed]})
        }
    
    
    
        connection.query(`INSERT INTO vrp_user_vehicles(user_id, vehicle) VALUES ('${id}', '${carro}')`, (err, rows) => { 
               let embed = new Discord.MessageEmbed()
    
                    .setDescription(`:oncoming_automobile: | Carro: **${carro}** Adicionado para ID: **${id}**.`)
                   .setColor("#85dac0")
    
                   return message.channel.send({embeds:[embed]})
            });
    }
}