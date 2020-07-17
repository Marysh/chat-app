const db = require('../models/index');


module.exports.addMessage = async (req, res) => {
    // todo why are you use async if you don't use await?


    if (req.body === '') {
        return res.status(422).json({errors: "Missing fields"});
    }

    db['Messages'].create({text: req.body.msg, userId: req.body.userId, chatId: req.body.chatId})
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


