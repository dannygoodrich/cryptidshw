const express = require('express');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');



const app = express();
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('static'));

// sum routes
app.get('/', (req, res) => {
    res.render('home');
});

// import controllers
app.use('/dinos', require('./routes/dinos'));
app.use('/cryptids', require('./routes/cryptids'));




app.listen(3000, () => console.log('you are listening'));