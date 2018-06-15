const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const path = require('path');
const { db } = require('./models');
const models = require('./models');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './stylesheets')));

app.get('/', (req, res, next) => {
    res.send(layout(''));
});

db.authenticate()
.then(() => {
    console.log('connected to the database');
});


const PORT = 3000;
const init = async() => {
    await models.db.sync({force: true});
    // await models.User.sync();
    // await models.Page.sync();
    app.listen(PORT, () => {
        console.log('hello world!');
    });
};

init();

