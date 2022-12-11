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
    name: 'money',


    run: async (client, message, args, member) => {

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);

    var id = args[0]
    var tipo = args[1]
    var quantia = args[2]

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

    if (!tipo) {
        let embed = new Discord.MessageEmbed()

            .setColor("#303136")
            .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu o tipo, escolha entre bank/wallet```")

        return message.channel.send({embeds:[embed]})
    }

    if (!quantia) {
        let embed = new Discord.MessageEmbed()

            .setColor("#303136")
            .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você não inseriu a quantia!```")

        return message.channel.send({embeds:[embed]})
    }

    if (isNaN(quantia)) {

        let embed = new Discord.MessageEmbed()

            .setColor("#303136")
            .addField(`**Ocorreu um erro.**`, "```yaml\nErro: Você inseriu uma quantia inválida, ela deve ser um número!```")

        return message.channel.send({embeds:[embed]})

    }

    


    if(tipo === "bank"){

        connection.query("SELECT * FROM vrp_user_moneys", function (err, result, fields) {
            if (err) throw err;

            var quantiantiga2 = result[0].bank;

          connection.query(`UPDATE vrp_user_moneys SET bank = bank + ${quantia} WHERE user_id = '${id}'`, (err, rows) => { //atualizando a whitelist do servidor
          });
          
          
              
              const res = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'});

              let embed = new Discord.MessageEmbed()

                .setDescription(`:money_with_wings: | **${res.format(quantia)}R$** Foi adicionado ao saldo bancario do ID **${id}**, Saldo Antigo: **${res.format(quantiantiga2)}**.`)
                .setColor("#303136")

                message.channel.send({embeds:[embed]})
              console.log(result)
          });
          }


          if(tipo === "wallet"){
            
            connection.query("SELECT * FROM vrp_user_moneys", function (err, result, fields) {
                if (err) throw err;
                
                var quantiantiga = result[0].wallet;

                connection.query(`UPDATE vrp_user_moneys SET wallet = wallet + ${quantia} WHERE user_id = '${id}'`, (err, rows) => { //atualizando a whitelist do servidor
                });
                const res = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'});
  
                let embed = new Discord.MessageEmbed()
  
                .setDescription(`:money_with_wings: | **${res.format(quantia)}R$** Foi adicionado ao saldo bancario do ID **${id}**, Saldo Antigo: **${res.format(quantiantiga)}**.`)
                .setColor("#303136")
  
                message.channel.send({embeds:[embed]})
                console.log(result)
            });
            }
          
  }
  
}