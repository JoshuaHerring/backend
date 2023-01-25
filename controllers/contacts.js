const { json } = require('express');
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

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

async function getContact(id)
{
    const uri = process.env.MONGODBURI;
    const client = new MongoClient(uri);

    await client.connect();
    let database = await findOne(client, id);
    await client.close();
    return database;
}

async function findOne(client, id)
{
    const database = await client.db("project1").collection("contacts").find({_id: id});
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
    console.log(req.params.id);
    const id = new ObjectId(req.params.id);
    let contact = await getContact(id);
    res.json(contact);
}
module.exports = {getAll, getOne};