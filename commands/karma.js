const {userDb} = require('../databases');
const { MessageFlags } = require('discord.js');

module.exports =
{
    name: "karma",
    usage: "(change)",
    description: "Displays or changes your stored karma",
    example:
    [
        ["", "shows your current karma"],
        ["+17", "adds 17 to your karma"],
        ["-17", "subtracts 17 from your karma"]
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
                if(!localUser.karma)
                {
                    throw new Error(`you haven't set your initial karma yet`);
                }

                if(args.length === 1)
                {
                    let statement = `${localUser.karma}${args[0]}`
                    localUser.karma = eval(statement);
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

                message.reply(`${salutation} ${localUser.karma} karma`);
            })
        .catch(err =>
            {
                console.log(err);
                message.reply(`${err.message}`);
            })
    }
}