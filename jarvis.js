const auth = require('./auth.json');

const {prefix} = require('./config.json');

const fs = require('fs');

const Discord = require('discord.js');

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

bot.on('message', message =>
{
    if(!message.author.bot && message.content.startsWith(prefix))
    {
        const args = message.content.slice(prefix.length + 1).split(/ +/);
        const command = args.shift().toLowerCase();

        if(!bot.commands.has(command))
        {
            return;
        }

        try
        {
            bot.commands.get(command).execute(message, args);
        }
        catch(error)
        {
            console.error(error);
            message.reply(`there was an error trying to execute that command`);
        }
    }
});

bot.login(auth.live)
.catch(err => console.error(err));