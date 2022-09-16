const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/household');

const FamilyMemberSchema = new Schema({ 
    name: {
        type: String,
        required: [true]
    },
    gender: {
        type: String,
        required: [true],
        enum: ["Male", "Female"]
    },
    marital_status: {
        type: String,
        required: [true],
        enum: ["Single", "Married", "Divorced"]
    },
    spouse: {
        type: String,
        default: null
    },
    occupation_type: {
        type: String,
        required: [true],
        enum: ["Unemployed", "Student", "Employed"]
    },
    annual_income: {
        type: Number,
        default: 0
    },
    DOB: {
        type: Number,
        required: [true]
    }
});

module.exports = {
    "FamilyMemberSchema" : FamilyMemberSchema,
    "FamilyMember" : mongoose.model('FamilyMember', FamilyMemberSchema)
}