const Discord = require('discord.js');
const mysql = require('mysql2'); 
const connection = mysql.createConnection({ 
    host: '190.102.42.163', // IP do Banco de Dados
    user: 'bairro', // Usuario do Banco de Dados
    password: '147258', // Senha do Banco de Dados
    database: 'zirix', // Nome da sua database
})

connection.connect((err) => {
});

    

module.exports = {
  name: 'idade',

    run: async (client, message, args, member) => {



        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);

        connection.query("SELECT * FROM vrp_user_identities", function (err, result, fields) {



const wlEmbed = new Discord.MessageEmbed()
.setTimestamp()
.setDescription(`O ID **${args[0]}** teve sua idade alterada.`)
.setColor("#303136")
.addFields({
    name: '>>> ID',
    value: `**${args[0]}**`,
    inline: false
},
{
  name: '>>> Idade Nova',
  value: `**${args[1]}**`,
  inline: false
},
{
    name: '>>> Por',
    value: `**${message.author}**`,
    inline: false
})


if(!args[0]){
return  message.reply("você não especificou o **ID**, use o formato: ID IDADE.")
  }
if(!args[1]){
return  message.reply("você não especificou a **Idade**, use o formato: ID Idade.")
}
  
  connection.query(`UPDATE vrp_user_identities SET age = '${args[1]}' WHERE user_id = '${args[0]}'`, (err, rows) => { });

  

  message.channel.send({embeds:[wlEmbed]})
  });
    }
  }