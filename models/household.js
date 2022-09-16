const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/household');

const FamilySchema = new Schema({ 
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
    },
    occupation_type: {
        type: String,
        required: [true],
        enum: ["Unemployed", "Student", "Employed"]
    },
    annual_income: {
        type: Number
    },
    DOB: {
        type: Number,
        required: [true]
    }
});

// Create schema for household
const HouseholdSchema = new Schema({
    household_type: {
        type: String,
        required: [true],
        enum: ["Landed", "Condominium", "HDB"]
    },
    family_members: [FamilySchema]
});

HouseholdSchema.methods.evalStudentEncouragementBonus = function evalStudentEncouragementBonus() {
    return false;
}

// // Testing the db
// const testHousehold = new Household({
//     household_type: "HDB"
// });

// console.log(testHousehold.household_type);
// console.log(testHousehold.evalStudentEncouragementBonus());

// await testHousehold.save();
// const households = await Household.find();
// console.log(households);

// console.log(await Household.find({ household_type: /HDB/ }));
// // End of test db

module.exports = mongoose.model('Household', HouseholdSchema);



