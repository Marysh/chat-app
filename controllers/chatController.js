const db = require('../models/index');
const {Op} = require("sequelize");


module.exports.startChat = (req, res) => {
    if (req.body === '') {
        return res.status(422).json({errors: "Missing fields"});
    }

    let newChat;
    db['ChatRoom'].create({ownerId: req.body.ownerId})
        .then(data => {
            newChat = data;
            return db['Users'].findAll({
                where: {
                    id: {
                        [Op.in]: [req.body.ownerId, req.body.newUserId]
                    }
                }
            });
        })
        .then(users => {
            return newChat.addUsers(users);
        })
        .then(data => {
            return getChatInfo(newChat.dataValues.id);
        })
        .then(newChat => {
            return res.status(200).send(newChat)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating."
            });
        });
};


module.exports.removeChat = (req, res) => {
    if (req.params.id) {
        let chatRoomId = parseInt(req.params.id, 10);
        let chatRoom;
        db['ChatRoom'].findByPk(chatRoomId, {
            include: [{
                model: db['Messages']
            }]
        }).then(c => {
            chatRoom = c;
            return db['Messages'].destroy({where: {id: chatRoom.Messages.map(m => m.id)}})
        }).then(result => {
            return chatRoom.destroy();
        }).then(data => {
            res.status(200).send(data);
        })
    }
};


module.exports.getAllUsers = (req, res) => {
    db['Users'].findAll({
        attributes: ['id', 'name']
    }).then(users => {
        return res.status(200).send(users);
    });
};


module.exports.getUsersForNewChat = (req, res) => {

    const ownerId = parseInt(req.params.id, 10);

    function findUsersForNewChat(chatMatesIds) {
        const queryObject = {where: {}};
        if (chatMatesIds.length !== 0) {
            queryObject.where.id = {
                [Op.notIn]: [...chatMatesIds, ownerId]
            };
        } else {
            queryObject.where.id = {
                [Op.ne]: ownerId
            };
        }

        return db['Users'].findAll(queryObject);
    }

    return db['Users'].findOne(
        {
            where: {
                id: {
                    [Op.eq]: ownerId
                }
            },
            include: [{
                model: db['ChatRoom'],
                include: [{
                    model: db['Users'],
                    attributes: ['id', 'name'],
                    where: {
                        id: {
                            [Op.ne]: ownerId
                        }
                    },
                }]
            }]
        }
    )
        .then(user => {
                const chatMatesIds = [];

                if (user) {
                    for (let i = 0; i < user.ChatRooms.length; i++) {
                        const room = user.ChatRooms[i];
                        for (let j = 0; j < room.Users.length; j++) {
                            chatMatesIds.push(room.Users[j].id);
                        }
                    }
                }

                return chatMatesIds;
            }
        )
        .then(chatMatesIds => findUsersForNewChat(chatMatesIds))
        .then(usersForNewChat => {
            return res.status(200).json(usersForNewChat);
        })
        .catch(e => {
            console.log(e);
        });
};


module.exports.getChatRooms = (req, res) => {
    const userId = parseInt(req.params.id, 10);

    db['Users'].findOne({
        where: {
            id: {
                [Op.eq]: [userId]
            }
        },
        include: [{
            model: db['ChatRoom'],
            include: [
                // get last message to show on chat preview
                {
                    model: db['Messages'],
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
                // get chat mate user
                {
                    model: db['Users'],
                    attributes: ['id', 'name'],
                    where: {
                        id: {
                            [Op.ne]: [userId]
                        }
                    },
                }
            ],
        }]
    })
        .then(data => {
            return res.status(200).json(data ? data.ChatRooms : []);
        })
        .catch(err => {
            console.log(err);
        });

};


module.exports.getInfo = (req, res) => {
    getChatInfo(req.params.id)
        .then(chat => {
            return res.status(200).json(chat)
        })
        .catch(err => {
            console.log(err);
        })
};


function getChatInfo(chatId) {
    return db['ChatRoom'].findOne({
        where: {
            id: parseInt(chatId)
        },
        include: [{
            model: db['Messages']
        },
            {
                model: db['Users'],
                attributes: ['id', 'name']
            }]
    })
}


module.exports.removeMsg = (req, res) => {
    if (req.params.id) {
        let msgId = parseInt(req.params.id, 10);
        let deletedMsg;
        db['Messages'].findByPk(msgId)
            .then(msg => {
                deletedMsg = msg;
                return db['Messages'].destroy({
                    where: {id: msgId}
                })
            })
            .then(result => {
                if (result === 1) {
                    res.status(200).json(deletedMsg);
                }
            })
    }

}
