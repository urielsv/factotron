require('dotenv').config();
const { Client, IntentsBitField, messageLink } = require('discord.js');
const fs = require('fs');
const { listenerCount, allowedNodeEnvironmentFlags } = require('process');
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

    if (i.commandName === 'facto') {
        try {
            const data = fs.readFileSync('fact-list.txt', 'utf8');
            var lines = data.split('\n');
            var line = lines[Math.floor(Math.random() * lines.length)];
            i.reply(`${line} `);
        } catch (err) {
            console.log(err);
            i.reply('Juamba cambiado^2');
        }
    }
});

client.login(process.env.TOKEN)