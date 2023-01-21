const routes = require("express").Router();

const contacts = require("../controllers/contacts.js")


// routes.use("/contacts", contacts.data);
routes.use("/contacts", require("./contacts"));


module.exports = routes;