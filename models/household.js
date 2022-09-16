const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const familymember_exports = require("./familymember")
const FamilyMemberSchema = familymember_exports["FamilyMemberSchema"]

const helper_exports = require("../helper");
const parse_date = helper_exports.parse_date; 
const compute_date_diff = helper_exports.compute_date_diff

mongoose.connect('mongodb://localhost:27017/household');

// Create schema for household
const HouseholdSchema = new Schema({
    household_type: {
        type: String,
        required: [true],
        enum: ["Landed", "Condominium", "HDB"]
    },
    family_members: {
        type: [FamilyMemberSchema],
        default: []
    },
    household_income: {
        type: Number,
        default: 0
    }
});

HouseholdSchema.methods.computeHouseholdIncome = function computeHouseholdIncome() {
    let total_household_income = 0;
    this.family_members.forEach(member => {
        total_household_income += member.annual_income
    });
    this.household_income = total_household_income;
}

HouseholdSchema.methods.evalStudentEncouragementBonus = function evalStudentEncouragementBonus() {
    this.computeHouseholdIncome();

    if (this.household_income >= 200000) {
        return
    }

    let hasStudentYoungerThan16 = false;

    let candidate_qualifying_members = [];

    this.family_members.forEach(member => {
        console.log(member.name);
        console.log(new Date().getFullYear())

        member_DOB_date = parse_date(member.DOB);
        member_age = compute_date_diff(member_DOB_date, new Date(), "year");

        console.log(member_age);

        if (member_age < 16 && member.occupation_type == "Student") {
            hasStudentYoungerThan16 = true;
        }
        if (member_age < 16) {
            candidate_qualifying_members.push(member);
        }
    });

    // Household income is less than 200,000 and has a student younger than 16
    // Now to return the household with only the qualifying members
    if (!hasStudentYoungerThan16) {return;}
    
    doc_javascript_obj = this.toObject();
    doc_javascript_obj["qualifying_members"] = candidate_qualifying_members;
    return doc_javascript_obj;
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

module.exports = {
    "Household" : mongoose.model('Household', HouseholdSchema),
};



