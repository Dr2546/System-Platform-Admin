const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const { engine } = require('express-handlebars');
const users = require('./Users');

const app = express();
app.engine('handlebars', engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', {
        title: 'User App',
        users 
    });
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/api/users'));

//get all users

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

