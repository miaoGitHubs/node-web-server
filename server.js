const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/partials');
app.set('view engine', 'hbs');//set hbs as view engine

app.use(express.static(__dirname + '/public')); //use this static url to find the page in public folder

app.use((req, res, next) =>{
	//next();
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n');
	next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) =>{
   // res.send("<h1>Hello express!</h1>");
   res.render('home.hbs', {
   	    pageTitle: 'Home Page',
   	    welcomeMessage: 'Welcome to MIAO workspace!'
   });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
    	pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
    	errorMessage: "Unable to handle request"
    });
});


app.listen(3000, () =>{
	console.log('Server is up on port 3000.');
});