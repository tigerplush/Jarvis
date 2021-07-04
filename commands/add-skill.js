const {userDb} = require('../databases');
const {featNames, featNumbers} = require('../feats');

module.exports =
{
    name: "add-skill",
    usage: "skill-name rank (description)",
    description: "adds a skill",
    example:
    [
    ],
    execute(message, args)
    {
        if(args.length < 2)
        {
            message.reply("you need to specify a skillname and a rank for it");
            return;
        }

        let skillName = args.shift();
        let skillRank = args.shift();

        let skillDescription = args.join(' ');

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
                if(!user.skills)
                {
                    user.skills = [];
                }

                let skillset = new Map();
                user.skills.forEach(skill =>
                    {
                        skillset.set(skill.name, skill);
                    });

                skill =
                {
                    name: skillName,
                    rank: skillRank,
                    description: skillDescription
                };

                skillset.set(skillName, skill);

                user.skills = [];
                skillset.forEach(skill =>
                    {
                        user.skills.push(skill);
                    })

                return userDb.update({owner: message.author.id}, user);
            })
        .then(() =>
            {
                let answer = `I have added your skill ${skillName} with the rank ${skillRank}`;

                if(skillDescription)
                {
                    answer += ` and the description:\n`;
                    answer += `${skillDescription}\n`;
                }

                answer += ` to the database`;

                message.reply(answer);
            })
        .catch(err =>
            {
                console.error(err);
                message.reply(err.message);
            });
    }
}