const { response } = require("express");
const {MongoClient} = require('mongodb');

async function main()
{
    const uri = process.env.MONGODBURI;
    const client = new MongoClient(uri);

    try{
    await client.connect();
    console.log("we tried")
    } catch(e) {
        console.error(e);
    }
    finally{
        await client.close();
    }

}

async function listDatabases(client)
{
    const dataBasesList = await client.db().admin().listDatabases();
    console.log("Databses");
    dataBasesList.databases.forEach(db => {
        console.log(`database is ${db.name}`);
    });
}

// const json = main;

const json = (req, res, next) =>{

    // res.setHeader("Access-Control-Allow-Origin", "*");

    res.json(
        {
            "_id": {
                "$oid": "63c19c3703fa30ad685babc5"
            },
            "firstName": "Joshua",
            "lastName": "Herring",
            "birthday": "09/22/2000",
            "email": "jdherring2222@gmail.com",
            "favoriteColor": "Dark Green"
        }
    );
}


module.exports = {json};