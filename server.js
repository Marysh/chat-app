const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const {syncDb} = require("./services/sync-db");
app.use(cors());
app.use(serveStatic('public', {'index': ['index.html']}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    let page = req.query.id;
    // todo is you don't use page then remove
    res.sendFile(__dirname + "/public/index.html");
});


(() => {
    app.use(require('./routes/index'));
    syncDb();
    app.listen(process.env.PORT || 3000, function () {
        console.log(`Example app listening on port ${process.env.PORT || 3000}!`);
    });
})();

