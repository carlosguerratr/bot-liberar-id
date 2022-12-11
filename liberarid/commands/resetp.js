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
  name: 'resetp',

    run: async (client, message, args) => {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${message.author} **Você não possui permissão para esse comando.**`);




const wlEmbed = new Discord.MessageEmbed()
.setTimestamp()
.setDescription(`O ID **${args[0]}** teve sua aparencia resetada/personagem.`)
.setColor("#303136")
.addFields({
    name: '>>> ID',
    value: `**${args[0]}**`,
    inline: false
}, {
    name: '>>> Por',
    value: `**${message.author}**`,
    inline: false
})

if(!args[0]){
return  message.reply("você não especificou o **ID**.")
  }

  

  connection.query(`UPDATE vrp_user_data SET dkey vRP:spawnControllers = '1' WHERE user_id = '${args[0]}'`, (err, rows) => { 

    message.channel.send({embeds:[wlEmbed]})

  }); 
      
    }
  }