const express = require('express');
const messagesRouter = express.Router();
const messagesController = require('../../controllers/messagesController');


messagesRouter.post('/add', messagesController.addMessage);

messagesRouter.get('/get', messagesController.getMessages);

module.exports = messagesRouter;
