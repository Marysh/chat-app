const db = require('../models/index');
const {Op} = require("sequelize");


module.exports.startChat = async (req, res) => {
    if (req.body === '') {
        return res.status(422).json({errors: "Missing fields"});
    }

    let newChat;
    db['ChatRoom'].create({ownerId: req.body.ownerId, name: req.body.name})
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


module.exports.removeChat = async (req, res) => {
    if (req.params.id) {
        db['ChatRoom'].findByPk(parseInt(req.params.id, 10)).then(chatRoom => chatRoom.destroy())
            .then(data => {
                res.status(200).send(data);
            })
    }
};


module.exports.getUsersForNewChat = async (req, res) => {
    return db['Users'].findOne(
        {
            where: {
                id: {
                    [Op.eq]: req.params.id
                }
            },
            // attributes: ['ChatRoomId'],
            include: [{
                model: db['ChatRoom'],
                include: [{
                    model: db['Users'],
                    where: {
                        id: {
                            [Op.ne]: 1
                        }
                    },
                }]
            }]
        }
    )
        .then(user => {
            const users = [];
            for (let i = 0; i < user.ChatRooms.length; i++) {
                const room = user.ChatRooms[i];
                for (let j = 0; j < room.Users.length; j++) {
                    users.push(room.Users[j]);
                }
            }
            return res.status(200).json(users);
        })
        .catch(e => {
            console.log(e);
        });
};

module.exports.getChatRooms = async (req, res) => {

    db['ChatRoom'].findAll({
        include: [
            {
                model: db['Messages'],
                limit: 1,
                order: [['createdAt', 'DESC']]
            }
        ]
    }).then(data => {
        return res.status(200).json(data);
    });

};

module.exports.getInfo = async (req, res) => {

    db['ChatRoom'].findOne({
        where: {id: parseInt(req.params.id)},
        include: [{
            model: db['Messages'],
            include: [{model: db['Users']}]
        }]
    })
        .then(result => {
                return res.status(200).json(result)
            }
        )
        .catch(err => {
            console.log(err);
        })
};



