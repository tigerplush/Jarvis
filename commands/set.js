const {userDb} = require('../databases');
const {featNames, featNumbers} = require('../feats');

module.exports =
{
    name: "set",
    usage: "*feat*/*name* *value*",
    description: "Sets your feats or initial values for karma, health and your name",
    example:
    [
        ["name Kurt", "changes your name to Kurt"],
        ["karma 50", "sets your karma to 50"],
        ["agility excellent", "sets your agility to rank 'excellent'"]
    ],
    execute(message, args)
    {
        if(args.length < 2)
        {
            message.reply("You need at least to specify which feat you wanna roll");
            return;
        }

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
                switch(args[0])
                {
                    case "name":
                        user.name = args[1];
                        break;
                    case "health":
                    case "karma":
                        user[args[0]] = parseInt(args[1]);
                        break;
                    case "fighting":
                    case "agility":
                    case "strength":
                    case "endurance":
                    case "reason":
                    case "intuition":
                    case "psyche":
                    case "resource":
                    case "popularity":
                        if(isNaN(args[1]) && featNames.has(args[1]))
                        {
                            //Is not a number
                            user[args[0]] = featNames.get(args[1]);
                        }
                        else if(featNumbers.has(Number(args[1])))
                        {
                            user[args[0]] = featNumbers.get(Number(args[1]));
                        }
                        else
                        {
                            message.reply(`something something error`);
                        }
                        break;
                }
                return userDb.update({owner: message.author.id}, user);
            })
        .then(user =>
            {
                message.reply(`updated your ${args[0]} to ${args[1]}`);
            })
        .catch(err =>
            {
                console.error(err);
                message.reply(`${err.message}`);
            });
    }
}