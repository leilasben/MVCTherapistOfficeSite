const mongoose = require('mongoose');
//SCHEME FOR CLIENT DB
var clientSchema = new mongoose.Schema({
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
    },
    DOB : {
        type: Date,
        required: "This field is required!"
    },
    pgName: {
        type: String,
        required: "This field is required!"
    },
    permissions: {
        type: String,
        required: "This field is required!"
    },
    registrationDate: {
        type: Date,
        required: "This field is required!"
    },
    maritalStatus: {
        type: String,
        required: "This field is required!"
    },
    referredBy: {
        type: String
    }
});

// ATTEMPTED TO VALIDATE DATA BUT IT WOULD NOT WORK

// //validation for email
// clientSchema.path('email').validate((val) => {
//     emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(val);
// }, 'Invalid e-mail.');
// //validation for phone number
// clientSchema.path('mobilePhone').validate((val) => {
//     mobilePhoneRegex = /^0(83|85|86|87|88|89)\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}$/;
//     return mobilePhoneRegex.test(val);
// }, 'Invalid mobile phone number');
// //validation for home phone number
// clientSchema.path('homePhone').validate((val) => {
//     homePhoneRegex = /^0(^\s(?\s\d{1,4}\s)?\s[\d\s]{5,10}\s*$)\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}\s?\d{1}$/;
//     return homePhoneRegex.test(val);
// }, 'Invalid home phone number');
// //validation for eircode
// clientSchema.path('eircode').validate((val) => {
//     eircodeRegex = /(a(4[125]|6[37]|75|8[1-6]|9[12468])|c15|d([0o])[1-9]|1[0-8o]|2[024o]|6w|e(2[15]|3[24]|4[15]|53|91)|f(12|2[368]|3[15]|4[25]|5[26]|9[1-4])|h(1[2468]|23|5[34]|6[25]|[79]1)|k(3[246]|45|56|67|78)|n(3[79]|[49]1)|p(1[247]|2[45]|3[126]|4[37]|5[16]|6[17]|7[25]|8[15])|r(14|21|3[25]|4[25]|5[16]|9[35])|t(12|23|34|45|56)|v(1[45]|23|3[15]|42|9[2-5])|w(12|23|34|91)|x(35|42|91)|y(14|2[15]|3[45]))\s*[acdefhknoprtvwxy\d]{4}/;
//     return eircodeRegex.test(val);
// }, 'Invalid Eircode');
// //validation to ensure they only answer yes or no
// clientSchema.path('permissions').validate((val) => {
//     permissionsRegex = /(Y|N)/
//     return permissionsRegex.test(val);
// }, 'Invalid input. Enter either Y or N to indicate Yes or No');

mongoose.model('Client', clientSchema);
