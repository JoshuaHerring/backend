const routes = require("express").Router();


const contacts = require("../controllers/contacts");


routes.get("/", contacts.getAll);
routes.get("/:id", contacts.getOne);

// router.post('/', contactsController.createContact);

// router.put('/:id', contactsController.updateContact);

// router.delete('/:id', contactsController.deleteContact);


module.exports = routes;

