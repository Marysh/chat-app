const express = require('express');
const chatRouter = express.Router();
const chatController = require('../../controllers/chatController');


chatRouter.post('/start', chatController.startChat);
chatRouter.delete('/remove/:id', chatController.removeChat);
chatRouter.get('/getUsers/:id', chatController.getUsersForNewChat);
chatRouter.get('/getUsers', chatController.getAllUsers);
chatRouter.get('/getRooms/:id', chatController.getChatRooms);
chatRouter.get('/getInfo/:id', chatController.getInfo);
chatRouter.delete('/removeMsg/:id', chatController.removeMsg);
// chatRouter.post('/editMsg/:id', chatController.editMsg);

module.exports = chatRouter;
