const mongoose = require('mongoose');
//SCHEMA FOR SESSION DB
var sessionSchema = new mongoose.Schema({
    sessionDate: {
        type: Date,
        required: 'This field is required.'
    },
    sessionTime: {
        type: String,
        required: 'This field is required.'
    },
    clients: {
        type: String,
        required: 'This field is required.'
    },
    therapist: {
        type: String,
        required: 'This field is required.'
    },
    fee: {
        type: String,
        required: 'This field is required.'
    },
    sessionNumber: {
        type: String,
        required: 'This field is required.'
    },
    sessionDuration: {
        type: String,
        required: 'This field is required.'
    },
    sessionType: {
        type: String,
        required: 'This field is required.'
    },
    issueFlag: {
        type: String,
        required: 'This field is required.'
    },
    sessionNotes: {
        type: String,
        required: 'This field is required.'
    }
});

mongoose.model('Session', sessionSchema);