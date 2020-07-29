const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const server = app.listen(3000);
const db = require('./models/index');


const io = require('socket.io')(server);
const {syncDb} = require("./services/sync-db");

app.use(cors({credentials: true, origin: true}));
app.use(serveStatic('public', {'index': ['index.html']}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

(() => {
    app.use(require('./routes/index'));
    syncDb();
})();


io.on('connection', (socket) => {

    socket.on('message-from-client-to-server', (msg) => {
        console.log(msg);
        socket.emit('message-from-server-to-client', msg);
    });

    socket.on('create', (room) => {
        socket.join(room);
        io.sockets.in(room).emit('event', 'bla');
    });


    socket.on('newMessage', (msgObj) => {
        db['Messages'].create({text: msgObj.text, userId: msgObj.userId, chatId: msgObj.chatId})
            .then(data => {
                socket.emit('incomingMessage', data);
            })
            .catch(err => {
                console.log(err);
            });
    });


    socket.on('disconnect', () => {
        console.log('disconnection')
    });

});
