const { json } = require('express');
const {MongoClient} = require('mongodb');

async function getContacts()
{
    const uri = process.env.MONGODBURI;
    const client = new MongoClient(uri);

    await client.connect();
    let database = await findAll(client);
    await client.close();
    return database;
}

async function findAll(client)
{
    const database = await client.db("project1").collection("contacts").find();
    let databases = await database.toArray();

    return(databases);
}

async function getContact(firstName)
{
    const uri = process.env.MONGODBURI;
    const client = new MongoClient(uri);

    await client.connect();
    let database = await findOne(client, firstName);
    await client.close();
    return database;
}

async function findOne(client, firstName)
{
    const database = await client.db("project1").collection("contacts").find({"firstName": firstName});
    let contact = await database.toArray();

    return contact;
}





let getAll = async (req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    let contacts = await getContacts();
    res.json(contacts);
}

let getOne = async (req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.params.firstName);
    let contact = await getContact(req.params.firstName);
    res.json(contact);
}
module.exports = {getAll, getOne};