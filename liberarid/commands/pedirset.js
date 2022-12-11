const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'pedirset', // Coloque o nome do comando do arquivo
    aliases: ["set"],

    run: (client, message, args) => {


        const bug = args.join(' ')
            if (!bug) return message.reply({
                content: `✖️ | Digite !pedirset (Nome do player + set da org/fac.) <erro> `,
                ephemeral: true,
            })
            else {
                message.reply({
                    content: '✔️ | **Pedido de set enviado para a staff.**',
                    ephemeral: true
                })
            }

        const canalDebug = client.channels.cache.get('1008015929608773783') // id do canal

        const bugs = new MessageEmbed()
            .setTitle('Novo pedido de set:')
            .setColor('0000ff')
            //.setImage('https://media.discordapp.net/attachments/996254453701292115/1007896160612130907/images_17.png')
            .setDescription(` **Descrição do pedido do set:** \n ${bug} `)
            .setTimestamp(new Date())
            .setFooter({ text: `Pedido de: ${message.author.username}`})

        canalDebug.send({ embeds: [bugs] })
    }
}