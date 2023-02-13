require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'addfacto',
        description: 'Agregar un facto.',
        options: [
            {
                name: 'facto',
                description: 'Mensaje del factazo.',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
        ],
    },
    {
        name: 'facto',
        description: 'Espiteate un factron xd',
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )        
        console.log('Slash commands were registered successfully!');
    } catch (e) {
        console.log(`Error: ${e}`);
    }
})();