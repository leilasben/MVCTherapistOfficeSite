const mongoose = require('mongoose');
//CONNECT TO DATABASE ON MONGODB
mongoose.connect('mongodb+srv://userAdmin:peq6676@cluster0-fivvs.mongodb.net/test', { useNewUrlParser:true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded') }
    else { console.log('Error in DB connection : ' + err) }
});
    
require('./client.model');
require('./therapist.model');
require('./session.model');