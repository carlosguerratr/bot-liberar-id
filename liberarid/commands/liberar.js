const Discord = require("discord.js");
const config = require("../config.json")

module.exports = {
  name: "liberar",
  

  run: async(client, message, args) => {

    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`:x: | ${message.author} Você não possui a permissão **GERENCIAR MENSAGENS** para enviar a mensagem de liberar id!`);

    let reset = new Discord.MessageButton().setCustomId("r").setLabel("Resetar ID").setStyle("SECONDARY").setEmoji('🆔')
    let row = new Discord.MessageActionRow().addComponents(reset) 

   let embed = new Discord.MessageEmbed()
   .setAuthor({name: `${message.guild.name}  | Auto Liberação`, iconURL: config.iconUrl, url: "https://i.ibb.co/BCk4PZ7/LOGO-bairro-norte-v2.png" })   
   .setDescription(`\`\`\` ✅ LIBERAÇÃO DE ID \`\`\`

   • Para realizar a liberação do seu **ID** envie nesta sala  o **ID | Nome Sobrenome**
   • Exemplo: **1 | Guerra Sanders**
   • Caso ocorra algum problema contacte a **STAFF**
   • Para obter seu **ID** você deve conectar no servidor usando a sala <#991094956078817341>
   
   \`\`\` 🆔 RESETAR ID \`\`\`
   
   • Caso o **BOT** avise que seu **ID** já esta vinculado a outro **ID** clique no **BOTÃO A BAIXO**`)
   .setColor("2F3136")

message.delete()
message.channel.send({embeds: [embed], components: [row] }) 

  }
}