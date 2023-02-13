require('dotenv').config();
const { Client, IntentsBitField, messageLink } = require('discord.js');
const fs = require('fs');
const { listenerCount } = require('process');
const { callbackify } = require('util');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} running.`)
});

client.on('interactionCreate', (i) => {
    if (!i.isChatInputCommand()) return;

    if (i.commandName === 'addfacto') {
        const fact = i.options.get('facto').value;
        //console.log(fact);
        fs.appendFile('fact-list.txt', `${fact}\n`, err => {});

        i.reply(`📝 ** Facto agregado! ** *"${fact}"*`);
    }
});

client.on('messageCreate', (msg) => {
    if (msg.content === "facto") {
        const data = fs.readFileSync('fact-list.txt', 'utf8');
        var lines = data.split('\n');

        var line = lines[Math.floor(Math.random() * lines.length)]
        //console.log(line);
        msg.reply(`${line} `);
    }
});

client.login(process.env.TOKEN)