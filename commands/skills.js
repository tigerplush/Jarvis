const {userDb} = require('../databases');

module.exports =
{
    name: "skills",
    usage: "",
    description: "lists your entered skills",
    example:
    [
    ],
    execute(message, args)
    {
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
                if(user.skills)
                {
                    let answer = `Your skills are:\n`;
                    user.skills.forEach(skill =>
                        {
                            answer += `**${skill.name}**: ${skill.rank}\n`;
                            if(skill.description)
                            {
                                answer += `${skill.description}\n`;
                            }
                        });

                    message.channel.send(answer);
                }
                else
                {
                    message.channel.reply(`You don't have any skills set yet, set new skills with \`!j add-skill skillName skillRank (description)\``);
                }
            })
        .catch(err =>
            {
                console.error(err);
                message.reply(err.message);
            });
    }
}