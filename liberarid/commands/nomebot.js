const Discord = require("discord.js")

module.exports = {
    name: "nomebot", // Coloque o nome do comando do arquivo
    aliases: ["nome"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let novo_nome = args.slice(0).join(" ")
        if(!novo_nome) return message.channel.send(`!nomebot <nome>`)
        if(novo_nome.length > 32) return message.channel.send(`O nome não pode ultrapassar 32 caracteres.`)
    
        client.user.setUsername(novo_nome).then(() => {

            let semrg = new Discord.MessageEmbed()
            .setDescription(`✅ Nome do BOT alterada com sucesso!`)
            message.channel.send({ embeds: [semrg] })

        }).catch(e => {

            message.channel.send({content: `${message.author}, ccorreu um erro na troca de nome do BOT!`})
        })
    }
}