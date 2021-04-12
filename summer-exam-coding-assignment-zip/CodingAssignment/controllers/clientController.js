//CONTROLLER FOR THE CLIENT WHICH ALLOWS CRUD

//IMPORTANT
//.lean() IS USED AS A WORK AROUND FOR AN ERROR RELATED TO HANDLEBARS WHICH WOULD SAY THAT ACCESS HAS BEEN DENIED

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Client = mongoose.model('Client');

//INSERTING INTO DATABASE
router.get('/',(req,res)=>{
    res.render("client/addOrEdit",{
        viewTitle : "Insert Client"
    });
});

router.post('/',(req,res)=>{
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req,res){
    var client = new Client();
    client.title = req.body.title;
    client.fname = req.body.fname;
    client.sname = req.body.sname;
    client.mobilePhone = req.body.mobilePhone;
    client.homePhone = req.body.homePhone;
    client.email = req.body.email;
    client.addressLine1 = req.body.addressLine1;
    client.addressLine2 = req.body.addressLine2;
    client.town = req.body.town;
    client.countyCity = req.body.countyCity;
    client.eircode = req.body.eircode;
    client.DOB = req.body.DOB;
    client.pgName = req.body.pgName;
    client.permissions = req.body.permissions;
    client.registrationDate = req.body.registrationDate;
    client.maritalStatus = req.body.maritalStatus;
    client.referredBy = req.body.referredBy;
    client.save((err, doc) => {
        if(!err)
            res.redirect('client/list');
        else {
            if(err.name == 'ValidationError' ){
                handleValidationError(err, req.body);
                res.render("client/addOrEdit",{
                    viewTitle : "Insert Client",
                    client : req.body
                });
            }
            else
            console.log("Error during record insertion : " + err);
        }
    });
}
//UPDATING RECORDS
function updateRecord(req, res) {
    Client.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('client/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("client/addOrEdit", {
                    viewTitle: 'Update Client',
                    client: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    }).lean();
}
//RETRIEVING DATA
router.get('/list',(req,res)=>{
    Client.find((err, docs)=>{
        if(!err) {
            res.render("client/list", {
                list: docs
            });
        }
        else{
            console.log("Error in retrieving list of Clients: " + err);
        }
    }).lean();  //get around handlebars error
});
//TELLS CLIENT IF ANY REQUIRED DATA HAS NOT BEEN INPUTTED
function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch (err.errors[field].path) {
            case 'fname' : 
                body['fnameError'] = err.errors[field].message;
                break;
            case 'sname':
                body['snameError'] = err.errors[field].message;
                break;
            case 'mobilePhone' : 
                body['mobilePhoneError'] = err.errors[field].message;
                break;
            case 'homePhone':
                body['homePhoneError'] = err.errors[field].message;
                break;
            case 'email' : 
                body['emailError'] = err.errors[field].message;
                break;
            case 'addressLine1':
                body['addressLine1Error'] = err.errors[field].message;
                break;
            case 'town' : 
                body['townError'] = err.errors[field].message;
                break;
            case 'countyCity':
                body['countyCityError'] = err.errors[field].message;
                break;
            case 'eircode' : 
                body['eircodeError'] = err.errors[field].message;
                break;
            case 'DOB':
                body['DOBError'] = err.errors[field].message;
                break;
            case 'pgName' : 
                body['pgNameError'] = err.errors[field].message;
                break;
            case 'permissions':
                body['permissionsError'] = err.errors[field].message;
                break;
            case 'registrationDate' : 
                body['registrationDateError'] = err.errors[field].message;
                break;
            case 'maritalStatus':
                body['maritalStatusError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Client.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("client/addOrEdit", {
                viewTitle: "Update Client",
                client: doc
            });
        }
    }).lean();
});
//DELETE DATA
router.get('/delete/:id', (req, res) => {
    Client.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/client/list');
        }
        else { console.log('Error in client delete :' + err); }
    }).lean();
});


module.exports = router;