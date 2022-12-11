const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("./config.json");
const fs = require("fs")

client.login(config.token);

client.once('ready', async () => {

    console.log("✅ - Estou online!")

})

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args,);
    } catch (err) {
        console.error('Erro:' + err);
    }
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};
client.on('ready', () => {

    let activities = [
        `${client.user.username}`,
        `DÚVIDAS? ABRA UM TICKET`
    ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
    }), 6000);
    client.user
        .setStatus("online")
    console.log(`On 2`)
})

//AUTOROLE Sem WL
client.on("guildMemberAdd", async (member) => {

    let cargo = member.guild.roles.cache.get("974464252310069278");  // Procurando cargo no servidor.

    if (!cargo) return console.log(`O cargo configurado no script, não existe no servidor ${member.guild.name}.`); // Verificando se o cargo existe.

    try {
        member.roles.add(cargo.id) // Enviando o cargo para o usuário.
    } catch (e) {
        console.log("Autorole:\n"+e) // Enviando erros ao console.
    }

});
