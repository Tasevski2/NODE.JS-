const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const ideas = require('./routes/ideas');
const users = require('./routes/users');



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));


app.use(flash());

app.use(function(req, res, next){
    res.locals.success_msg = req.flash("success_msg"),
    res.locals.error_msg = req.flash("error_msg"),
    res.locals.error = req.flash("error");
    next(); 

});



app.use('/ideas', ideas);
app.use('/users', users);


app.get('/', (req, res) => {
    const title = "Welcome";
    res.render('index', {
        title: title
    })
});



app.get('/about', (req, res) => {
    res.render('about');
});



const port = 5000;

app.listen(port, () => {
    console.log(`App runned on port ${port}`);
});