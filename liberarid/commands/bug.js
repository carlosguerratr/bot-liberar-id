const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'bug', // Coloque o nome do comando do arquivo
    aliases: ["bugs"],

    run: (client, message, args) => {


        const bug = args.join(' ')
            if (!bug) return message.reply({
                content: `✖️ | Digite !bug <erro> `,
                ephemeral: true,
            })
            else {
                message.reply({
                    content: '✔️ | **Bug enviado para a Staff do servidor com sucesso.**',
                    ephemeral: true
                })
            }

        const canalDebug = client.channels.cache.get('1008012780621791403') // id do canal

        const bugs = new MessageEmbed()
            .setTitle('Novo bug reportado:')
            .setColor('0000ff')
            //.setImage('https://media.discordapp.net/attachments/996254453701292115/1007896160612130907/images_17.png')
            .setDescription(` **Descrição do bug relatado:** \n ${bug} `)
            .setTimestamp(new Date())
            .setFooter({ text: `Reportado por: ${message.author.username}`})

        canalDebug.send({ embeds: [bugs] })
    }
}