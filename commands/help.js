const {prefix} = require('../config.json');

module.exports =
{
    name: "help",
    usage: "(command)",
    description: "",
    example:
    [
    ],
    execute(message, args)
    {
        const {commands} = message.client;

        let answer = `\`${prefix} `;
        if(!args.length)
        {
            answer += `${this.name}\`\n`
            answer += `${this.description}\n`;
            answer += `Available commands: \`${prefix} `;
            answer += commands.map(command => {
                if(!command.hidden)
                {
                    return command.name;
                }
            }).join(`\`, \`${prefix} `);
            answer += `\`\nGet more info with \`${prefix} ${commands.get("help").name} command\``;
        }
        else
        {
            if(commands.has(args[0]))
            {
                command = commands.get(args[0]);
                answer += `${[command.name, command.usage].join(` `).trim()}\`\n`
                answer += `${command.description}\n`;
                answer += `Examples:`
                command.example.forEach(example =>
                    {
                        answer += `\n\`${prefix} ${[command.name, example[0]].join(` `).trim()}\`: ${example[1]}`;
                    });
            }
            else
            {
                answer += `${args[0]}\` is not a valid command`;
            }
        }
        message.channel.send(answer);
    }
}