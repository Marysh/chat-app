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
            res.status(200).send(newChat)
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
    db['Users'].findAll().then(users => {
        return res.status(200).send(users);
    });
};


module.exports.getUsersForNewChat = (req, res) => {

    const ownerId = parseInt(req.params.id, 10);

    function findUsers(users) {
        const queryObject = {where: {}};
        if (users.length !== 0) {
            queryObject.where.id = {
                [Op.notIn]: [...users, ownerId]
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
                const users = [];

                if (user) {
                    for (let i = 0; i < user.ChatRooms.length; i++) {
                        const room = user.ChatRooms[i];
                        for (let j = 0; j < room.Users.length; j++) {
                            users.push(room.Users[j].id);
                        }
                    }
                }

                return users;
            }
        )
        .then(users => findUsers(users))
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
                {
                    model: db['Messages'],
                    limit: 1,
                    order: [['createdAt', 'DESC']]
                },
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

    db['ChatRoom'].findOne({
        where: {
            id: parseInt(req.params.id)
        },
        include: [{
            model: db['Messages'],
            include: [{
                model: db['Users'],
            }]
        },
            {
                model: db['Users'],
            }],
    })
        .then(chat => {
            return res.status(200).json(chat)
        })
        .catch(err => {
            console.log(err);
        })
};



