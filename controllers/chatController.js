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
    // todo
    // getChatRooms where you are owner and include users_rooms
    // filter rows with your id
    // map the result to get array of users id's of the rest rows

    db['Users'].findAll(
        //     where: {
        //     userId: {
        //         [Op.notIn]: resultIds
        //     }
        // }

    ).then(data => {
        return res.status(200).json(data);
    });
};

module.exports.getChatRooms = async (req, res) => {

    db['ChatRoom'].findAll().then(data => {
        return res.status(200).json(data);
    });

};

module.exports.getInfo = async (req, res) => {

    db['ChatRoom'].findOne({
        where: {id: parseInt(req.params.id)},
        include: [{
            model: db['Users'],
            include: [{model: db['Messages']}]
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

// where: {
//     id: {
//         [Op.in]: [req.body.ownerId, req.body.newUserId]
//     }
// }


