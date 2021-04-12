//CONTROLLER FOR THE SESSION WHICH ALLOWS CRUD

//IMPORTANT
//.lean() IS USED AS A WORK AROUND FOR AN ERROR RELATED TO HANDLEBARS WHICH WOULD SAY THAT ACCESS HAS BEEN DENIED

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Session = mongoose.model('Session');

router.get('/', (req, res) => {
    res.render("session/addOrEdit", {
        viewTitle: "Insert Session"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

//INSERT
function insertRecord(req, res) {
    var session = new Session();
    session.sessionDate = req.body.sessionDate;
    session.sessionTime = req.body.sessionTime;
    session.clients = req.body.clients;
    session.therapist = req.body.therapist;
    session.fee = req.body.fee;
    session.sessionNumber = req.body.sessionNumber;
    session.sessionDuration = req.body.sessionDuration;
    session.sessionType = req.body.sessionType;
    session.issueFlag = req.body.issueFlag;
    session.sessionNotes = req.body.sessionNotes;
    session.save((err, doc) => {
        if (!err)
            res.redirect('session/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("session/addOrEdit", {
                    viewTitle: "Insert Session",
                    session: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}
//UPDATE
function updateRecord(req, res) {
    Session.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('session/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("session/addOrEdit", {
                    viewTitle: 'Update Session',
                    session: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    }).lean();
}

//RETRIEVE
router.get('/list', (req, res) => {
    Session.find((err, docs) => {
        if (!err) {
            res.render("session/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving session list :' + err);
        }
    }).lean();
});
//TELLS CLIENT IF ANY REQUIRED DATA HAS NOT BEEN INPUTTED
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'sessionDate':
                body['sessionDateError'] = err.errors[field].message;
                break;
            case 'sessionTime':
                body['sessionTimeError'] = err.errors[field].message;
                break;
            case 'clients':
                body['clientsError'] = err.errors[field].message;
                break;
            case 'therapist':
                body['therapistError'] = err.errors[field].message;
                break;
            case 'fee':
                body['feeError'] = err.errors[field].message;
                break;
            case 'sessionNumber':
                body['sessionNumberError'] = err.errors[field].message;
                break;
            case 'sessionDuration':
                body['sessionDurationError'] = err.errors[field].message;
                break;
            case 'sessionType':
                body['sessionTypeError'] = err.errors[field].message;
                break;
            case 'issueFlag':
                body['issueFlagError'] = err.errors[field].message;
                break;
            case 'sessionNotes':
                body['sessionNotesError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Session.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("session/addOrEdit", {
                viewTitle: "Update Session",
                session: doc
            });
        }
    }).lean();
});
//DELETE
router.get('/delete/:id', (req, res) => {
    Session.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/session/list');
        }
        else { console.log('Error in session delete :' + err); }
    }).lean();
});

module.exports = router;