//CONTROLLER FOR THE SESSION WHICH ALLOWS CRUD

//IMPORTANT
//.lean() IS USED AS A WORK AROUND FOR AN ERROR RELATED TO HANDLEBARS WHICH WOULD SAY THAT ACCESS HAS BEEN DENIED

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Therapist = mongoose.model('Therapist');


router.get('/',(req,res)=>{
    res.render("therapist/addOrEdit",{
        viewTitle : "Insert Therapist"
    });
});

router.post('/',(req,res)=>{
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

//INSERT
function insertRecord(req,res){
    var therapist = new Therapist();
    therapist.title = req.body.title;
    therapist.fname = req.body.fname;
    therapist.sname = req.body.sname;
    therapist.mobilePhone = req.body.mobilePhone;
    therapist.homePhone = req.body.homePhone;
    therapist.email = req.body.email;
    therapist.addressLine1 = req.body.addressLine1;
    therapist.addressLine2 = req.body.addressLine2;
    therapist.town = req.body.town;
    therapist.countyCity = req.body.countyCity;
    therapist.eircode = req.body.eircode;
    therapist.save((err, doc) => {
        if(!err)
            res.redirect('therapist/list');
        else {
            if(err.name == 'ValidationError' ){
                handleValidationError(err, req.body);
                res.render("therapist/addOrEdit",{
                    viewTitle : "Insert Therapist",
                    therapist : req.body
                });
            }
            else
            console.log("Error during record insertion : " + err);
        }
    });
}
//UPDATE
function updateRecord(req, res) {
    Therapist.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('therapist/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("therapist/addOrEdit", {
                    viewTitle: 'Update therapist',
                    therapist: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    }).lean();
}
//RETRIEVE
router.get('/list',(req,res)=>{
    Therapist.find((err, docs)=>{
        if(!err) {
            res.render("therapist/list", {
                list: docs
            });
        }
        else{
            console.log("Error in retrieving list of Therapists: " + err);
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
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Therapist.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("therapist/addOrEdit", {
                viewTitle: "Update Therapist",
                therapist: doc
            });
        }
    }).lean();
});
//DELETE
router.get('/delete/:id', (req, res) => {
    Therapist.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/therapist/list');
        }
        else { console.log('Error in therapist delete :' + err); }
    }).lean();
});


module.exports = router;