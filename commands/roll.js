const {userDb} = require('../databases');
const {featNames, featNumbers, featRolls} = require('../feats');

module.exports =
{
    name: "roll",
    usage: "*feat* (+/-)",
    description: "",
    example:
    [
        ["roll agility", "rolls for agility"]
        ["roll intuition +", "rolls for intuition plus one column"],
        ["roll reason +++-", "rolls for reason with plus two columns"]
    ],
    execute(message, args)
    {
        if(args.length < 1)
        {
            message.reply("you need at least to specify which feat you wanna roll");
            return;
        }

        let shift = 0;

        if(args.length > 1)
        {
            let shiftStr = args.join('');
            shift += (shiftStr.match(/\+/g) || []).length;
            shift -= (shiftStr.match(/\-/g) || []).length;
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
                    case "fighting":
                    case "agility":
                    case "strength":
                    case "endurance":
                    case "reason":
                    case "intuition":
                    case "psyche":
                    case "resource":
                    case "popularity":
                        if(user[args[0]])
                        {
                            let answer = roll(user[args[0]], shift, user.name);

                            message.reply(answer);
                        }
                        else
                        {
                            message.reply(`the feat doesn't exist`);
                        }
                        break;
                    default:
                        let feat;
                        if(featNames.has(args[0]))
                        {
                            feat = featNames.get(args[0]);
                        }
                        if(featNumbers.has(args[0]))
                        {
                            feat = featNumbers.get(args[0]);
                        }
                        if(feat)
                        {
                            let answer = roll(feat, shift, user.name);
                            message.reply(answer);
                        }
                        else
                        {
                            message.reply(`the feat doesn't exist`);
                        }
                        break;
                }
            })
        .catch(err =>
            {
                console.error(err);
                message.reply(err.message);
            });
    }
}

function roll(feat, shift, username)
{
    const randomValue = Math.floor(Math.random() * 100);

    feat += shift;
    feat = Math.min(Math.max(0, feat), 17);

    let color = "**white**";
    missing = `${featRolls[feat].green - randomValue} karma missing for next level`;
    if(randomValue >= featRolls[feat].red)
    {
        color = "```diff\n- red\n```";
        missing = "";
    }
    else if(randomValue >= featRolls[feat].yellow)
    {
        color = "```fix\nyellow\n```";
        missing = `${featRolls[feat].red - randomValue} karma missing for next level`;
    }
    else if(randomValue >= featRolls[feat].green)
    {
        color = "```diff\n+ green\n```";
        missing = `${featRolls[feat].yellow - randomValue} karma missing for next level`;
    }

    let salutation = "you";
    if(username)
    {
        salutation = username;
    }

    let answer = `${salutation} rolled ${color} with a value of ${randomValue}`;

    if(shift !== 0)
    {
        answer += ` with a netto column shift of ${shift}`;
    }

    if(missing !== "")
    {
        answer += `\n${missing}`;
    }

    return answer;
}