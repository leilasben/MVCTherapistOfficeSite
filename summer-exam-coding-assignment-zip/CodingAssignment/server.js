/* CS230 CODING ASSIGNMENT EXAMINATION 
    this code is ran on localhost:3000 and i used nodemon to run the server while making changes
    if you type localhost:3000/clients it will take you to a page to insert data for the client
    from there, buttons are available to navigate through the web page.
    i found this assignment challenging but enjoyable. i found johns notes quite difficult to follow for this assignment
    so i did some research and found an excellent video which i followed as i otherwise would not have been able to complete
    this examination: "Complete Node.js Express MongoDB CRUD" - CodAffection https://www.youtube.com/watch?v=voDummz1gO0&start=1410s
    it was an extremely helpful resource that gave me a good start to this assignment.
    i was disappointed that i could not get all of the form validation to work, but perhaps if i had more time
    i would be able to implement this feature. overall, i am happy enough with my work.
    
    AUTHENTICATION DETAILS
    user name : userAdmin
	password: peq6676
    ip address set to: 0.0.0.0/0
    
    I used Google Chrome to run localhost on Windows
*/

require('./models/db');     //call the data models for each collection

const express = require('express');     //expressjs
const path = require('path');
const exphbs = require('express-handlebars');   //handlebars
const bodyparser = require('body-parser');      //body parser

//creating constant variables for the controllers
const clientController = require('./controllers/clientController');
const therapistController = require('./controllers/therapistController');
const sessionController = require('./controllers/sessionController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');  //getting layout for page using handlebars

//use localhost:3000 to view program
app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

app.use('/client',clientController);
app.use('/therapist',therapistController);
app.use('/session',sessionController);
