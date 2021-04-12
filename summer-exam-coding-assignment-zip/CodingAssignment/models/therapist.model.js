const mongoose = require('mongoose');
//SCHEMA FOR THERAPIST DB
var therapistSchema = new mongoose.Schema({
    title: {
        type: String
    },
    fname: {
        type: String,
        required: "This field is required!"
    },
    sname: {
        type: String,
        required: "This field is required!"
    },
    mobilePhone: {
        type: String,
        required: "This field is required!"
    },
    homePhone: {
        type: String,
        required: "This field is required!"
    },
    email: {
        type: String,
        required: "This field is required!"
    },
    addressLine1: {
        type: String,
        required: "This field is required!"
    },
    addressLine2: {
        type: String,
    },
    town: {
        type: String,
        required: "This field is required!"
    },
    countyCity: {
        type: String,
        required: "This field is required!"
    },
    eircode: {
        type: String
    }
});

//COULD NOT GET SPECIFIC VALIDATION WORKING

// //validation for email
// therapistSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');
// //validation for phone number
// therapistSchema.path('mobilePhone').validate((val) => {
//     mobilePhoneRegex = /^0(83|85|86|87|88|89)\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}$/;
//     return mobilePhoneRegex.test(val);
// }, 'Invalid mobile phone number');
mongoose.model('Therapist', therapistSchema);