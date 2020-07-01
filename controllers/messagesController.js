const db = require('../models/index');


module.exports.addMessage = async (req, res) => {
    if (req.body === '') {
        return res.status(422).json({errors: "Missing fields"});
    }

    db['Messages'].create({text: req.body.msg, userId: req.body.userId, chatRoomId: req.body.chatRoomId})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating."
            });
        });
};

module.exports.getMessages = async (req, res) => {
    db['Messages'].findAll().then(data => {
        return res.status(200).json(data);
    });
};

