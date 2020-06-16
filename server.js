const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const db = require("./models/index");
const {syncDb} = require("./services/sync-db");


app.use(cors());

app.use(serveStatic('public', {'index': ['index.html']}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get('/getMessages', function (req, res) {
    db['Messages'].findAll().then(data => {
        return res.status(200).json(data);
    });
});
app.get('/getChatRooms', function (req, res) {
    db['ChatRoom'].findAll().then(data => {
        return res.status(200).json(data);
    });
});

app.post('/addMessage', function (req, res) {
    if (req.body === '') {
        return res.status(422).json({errors: "Missing fields"});
    }

    db['Messages'].create({text: req.body.msg})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating."
            });
        });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

syncDb();
