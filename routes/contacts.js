const routes = require("express").Router();


const contacts = require("../controllers/contacts");


routes.get("/", contacts.getAll);
routes.get("/:firstName", contacts.getOne);


module.exports = routes;

