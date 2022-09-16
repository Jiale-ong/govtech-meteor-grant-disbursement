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
    
    let doc_javascript_obj = this.toObject();
    doc_javascript_obj["qualifying_members"] = candidate_qualifying_members;
    return doc_javascript_obj
}

HouseholdSchema.methods.evalMultiGenScheme = function evalMultiGenScheme() {
    this.computeHouseholdIncome();

    if (this.household_income >= 150000) {
        console.log(this.household_income);
        return
    }

    let hasValidMember = false

    this.family_members.forEach(member => {
        member_DOB_date = parse_date(member.DOB);
        member_age = compute_date_diff(member_DOB_date, new Date(), "year");

        if (member_age < 18 || member_age > 55) {
            hasValidMember = true
        }
    });

    if (!hasValidMember) {
        return
    } else {
    let doc_javascript_obj = this.toObject();
    let family_members = doc_javascript_obj["family_members"].slice();
    doc_javascript_obj["qualifying_members"] = family_members;

    console.log(family_members);
    console.log(doc_javascript_obj);
    return doc_javascript_obj
    }
}

HouseholdSchema.methods.evalElderBonus = function evalElderBonus() {
    if (this.household_type != "HDB") {
        return
    }

    let hasMemberAbove55 = false;
    let valid_members = [];

    this.family_members.forEach(member => {
        member_DOB_date = parse_date(member.DOB);
        member_age = compute_date_diff(member_DOB_date, new Date(), "year");

        if (member_age > 55) {
            hasMemberAbove55 = true;
        }
        if (member_age >= 55) {
            valid_members.push(member.toObject());
        }
    });

    if (hasMemberAbove55) {
        let doc_javascript_obj = this.toObject();
        doc_javascript_obj["qualifying_members"] = valid_members;
        return doc_javascript_obj;
    }
}

HouseholdSchema.methods.evalBabySunshineGrant = function evalBabySunshineGrant() {
    let valid_members = [];

    this.family_members.forEach(member => {
        member_DOB_date = parse_date(member.DOB);
        member_age_month = compute_date_diff(member_DOB_date, new Date(), "month");

        if (member_age_month < 8) {
            valid_members.push(member.toObject());
        }
    });

    if (valid_members.length > 0) {
        let doc_javascript_obj = this.toObject();
        doc_javascript_obj["qualifying_members"] = valid_members;
        return doc_javascript_obj;
    }
}

HouseholdSchema.methods.evalYOLOGSTGrant = function evalYOLOGSTGrant() {
    if (this.household_type != "HDB") {
        return
    }
    
    if (this.household_income >= 100000) {
        return
    }

    let doc_javascript_obj = this.toObject();
    let family_members = doc_javascript_obj["family_members"].slice();
    doc_javascript_obj["qualifying_members"] = family_members;
    return doc_javascript_obj;
}

module.exports = {
    "Household" : mongoose.model('Household', HouseholdSchema),
};



