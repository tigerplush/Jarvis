const {userDb} = require('../databases');
const { MessageFlags } = require('discord.js');

module.exports =
{
    name: "health",
    usage: "(change)",
    description: "Displays or changes your stored health",
    example:
    [
        ["", "shows your current health"],
        ["+17", "adds 17 to your health"],
        ["-17", "subtracts 17 from your health"]
    ],
    execute(message, args)
    {
        let localUser = {};
        userDb.find({owner: message.author.id})
        .then(user =>
            {
                if(user && user.length > 0)
                {
                    return user[0];
                }
                user = {owner: message.author.id};
                return userDb.add(user);
            })
        .then(user =>
            {
                localUser = user;
                if(!localUser.health)
                {
                    throw new Error(`you haven't set your initial health yet`);
                }

                if(args.length === 1)
                {
                    let statement = `${localUser.health}${args[0]}`
                    localUser.health = eval(statement);
                    return userDb.update({owner: message.author.id}, localUser);
                }
            })
        .then(() =>
            {
                let salutation = `you have`;
                if(localUser.name)
                {
                    salutation = `${localUser.name} has`;
                }

                message.reply(`${salutation} ${localUser.health} health`);
            })
        .catch(err =>
            {
                console.log(err);
                message.reply(`${err.message}`);
            })
    }
}