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

let createContact = async (req, res) =>{

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const client = new MongoClient(process.env.MONGODBURI);
    const response = await client.db("project1").collection("contacts").insertOne(contact);

    if(response.acknowledged) {
        res.status(201).json(response);
    }
    else{
        res.status(500).json(response.error || 'Some error occured while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    const id = new ObjectId(req.params.id);

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const client = new MongoClient(process.env.MONGODBURI);
    const response = await client.db("project1").collection("contacts").replaceOne({_id: id}, contact);
    console.log(response)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else{
        res.status(500).json(response.error || "Some error occurred while updating the contact");
    }
};

const deleteContact = async (req, res) => {
    const id = new ObjectId(req.params.id);

    const client = new MongoClient(process.env.MONGODBURI);
    const response = await client.db("project1").collection("contacts").deleteOne({_id: id});

    if (response.deletedCount > 0)
    {
        res.status(200).send();
    }
    else{
        res.status(500).json(response.error || "Some error occured while deleting the contact");
    }
};





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
module.exports = {getAll, getOne, createContact, updateContact, deleteContact};