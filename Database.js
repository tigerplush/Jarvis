const DataStore = require('nedb');
const { resolve } = require('path');

class Database
{
    constructor()
    {
        this.database = new DataStore('characters.db');
        this.database.loadDatabase();
    }

    find(query)
    {
        return new Promise((resolve, reject) =>
        {
            this.database.find(query, function(err, doc)
            {
                if(err)
                {
                    reject(err);
                }
                resolve(doc);
            })
        });
    }

    add(newDoc)
    {
        return new Promise((resolve, reject) =>
        {
            this.database.insert(newDoc, function(err, document)
            {
                if(err)
                {
                    reject(err);
                }
                resolve(document);
            })
        });
    }

    update(query, updateQuery)
    {
        return new Promise((resolve, reject) =>
        {
            this.database.update(query, updateQuery, {}, function(err)
            {
                if(err)
                {
                    reject(err);
                }
                resolve();
            })
        });
    }
}

module.exports = Database;