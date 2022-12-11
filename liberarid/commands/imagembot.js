const Discord = require("discord.js")

module.exports = {
    name: "imagembot", // Coloque o nome do comando do arquivo
    aliases: ["imagem"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let imglink = args.slice(0).join(" ")
        client.user.setAvatar(imglink)

        let semrg = new Discord.MessageEmbed()
            .setDescription(`✅ Imagem do BOT alterada com sucesso!`)
            message.channel.send({ embeds: [semrg] })
    }
}