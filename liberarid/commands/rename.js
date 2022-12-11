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
  name: 'rename',

    run: async (client, message, args, member) => {



        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);
        connection.query("SELECT * FROM vrp_user_identities", function (err, result, fields) {


const wlEmbed = new Discord.MessageEmbed()
.setTimestamp()
.setDescription(`O ID **${args[0]}** teve seu nome alterado.`)
.setColor("#303136")
.addFields({
    name: '>>> ID',
    value: `**${args[0]}**`,
    inline: false
},
{
  name: '>>> NOME NOVO',
  value: `**${args[1]} ${args[2]}**`,
  inline: false
},
{
    name: '>>> Por',
    value: `**${message.author}**`,
    inline: false
})


if(!args[0]){
return  message.reply("você não especificou o **ID**, use o formato: ID NOME SOBRENOME.")
  }
if(!args[1]){
return  message.reply("você não especificou o **Nome**, use o formato: ID NOME SOBRENOME.")
}
if(!args[2]){
return  message.reply("você não especificou o **Sobrenome**, use o formato: ID NOME SOBRENOME.")
}
  
  connection.query(`UPDATE vrp_user_identities SET name = '${args[1]}' WHERE user_id = '${args[0]}'`, (err, rows) => { });
  connection.query(`UPDATE vrp_user_identities SET firstname = '${args[2]}' WHERE user_id = '${args[0]}'`, (err, rows) => { });

  

  message.channel.send({embeds:[wlEmbed]})
  });
    
    }
  }