const express = require('express');
const router = express.Router();

const mongoose = require("mongoose");
const household_exports = require("../models/household");
const Household = household_exports["Household"];

const familymember_exports = require("../models/familymember");
const FamilyMember = familymember_exports["FamilyMember"];

// Test Connectivity APIs
router.get('/testpoint', (req, res, next) => {
    // get placeholder
    res.json({
        "code": 200,
        "message" : "api is accessible"
    })
});

router.post('/testpoint', (req, res, next) => {
    // post placeholder
    res.json({
        "code": 200,
        "message" : "api is accessible"
    })
});

router.delete('/testpoint/:id', (req, res, next) => {
    // delete placeholder
    res.json({
        "code": 200,
        "message" : "api is accessible",
        "id" : id
    })
});
// End of Test Connectivity APIs

// Household APIs
router.get('/household', async (req, res, next) => {
    console.log("GET /api/household");
    // This will return all the data, exposing only the id and action field to the client
    Household.find({})
        .then((data) => res.json(data))
        .catch(next);
});

router.get('/household/:id', async (req, res, next) => {
    console.log("GET /api/household");
    // This will return all the data, exposing only the id and action field to the client
    Household.findOne({_id: req.params.id})
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/household', async (req, res, next) => {
    if (req.body.household_type) {
        req.body["family_members"] = []
        Household.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({
            error: 'Missing required field household_type',
        });
    }
});

router.delete('/household/:id', async (req, res, next) => {
    Household.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
});
// End of Household APIs

// Family Member APIs
router.post('/family_member', async (req, res, next) => {
    if (!req.body.household_id) {
        res.json({
            error: 'Missing required field household_id'
        });
    }
    if (!req.body.family_member) {
        res.json({
            error: 'Missing required field family_member'
        });
    } 

    const selected_household = await Household.findOne({_id: req.body.household_id}).exec();

    console.log(selected_household);
    console.log(selected_household.household_type);
    console.log("=== selected_household family members ===");
    console.log(selected_household.family_members);

    selected_household.family_members.push(req.body.family_member);
    console.log("Updated household with household id " + selected_household._id);
    console.log(selected_household);

    selected_household.save(function (err) {
        if (err) {
            console.log(err);
            console.log('Failed!');
            res.json({
                "code" : 500,
                "message" : "Failed to save family member due to server error, error " + err
            });
        } else {
            res.send(selected_household);
        }
    });
});
// End of family members apis

// Grant APIs
router.get('/grant/student_encouragement_bonus', async (req, res, next) => {
    console.log("GET /api/grant/student_encouragement_bonus");
    // This will return all the data, exposing only the id and action field to the client
    Household.find({})
        .then((data) => {
        let qualifying_households = []

        data.forEach(curr_household => {
            let curr_result = curr_household.evalStudentEncouragementBonus();
            if (curr_result) {
                qualifying_households.push(curr_result)
            }
        });

        if (qualifying_households) {
            res.json(qualifying_households)
        } else {
            res.json({
            "code" : 200,
            "message" : "Success. There are no qualifying households nor members."
        })}
        })
        .catch(next);
});

router.get('/grant/multigenerational_scheme', async (req, res, next) => {
    console.log("GET /api/grant/multigenerational_scheme");
    // This will return all the data, exposing only the id and action field to the client
    Household.find({})
        .then((data) => {
        let qualifying_households = []

        data.forEach(curr_household => {
            let curr_result = curr_household.evalMultiGenScheme();
            console.log(curr_household._id);
            console.log(curr_result);
            if (curr_result) {
                qualifying_households.push(curr_result)
            }
        });

        if (qualifying_households) {
            res.json(qualifying_households)
        } else {
            res.json({
            "code" : 200,
            "message" : "Success. There are no qualifying households nor members."
        })}
        })
        .catch(next);
});

router.get('/grant/elder_bonus', async (req, res, next) => {
    console.log("GET /api/grant/elder_bonus");
    // This will return all the data, exposing only the id and action field to the client
    Household.find({})
        .then((data) => {
        let qualifying_households = []

        data.forEach(curr_household => {
            let curr_result = curr_household.evalElderBonus();
            console.log(curr_household._id);
            console.log(curr_result);
            if (curr_result) {
                qualifying_households.push(curr_result)
            }
        });

        if (qualifying_households) {
            res.json(qualifying_households)
        } else {
            res.json({
            "code" : 200,
            "message" : "Success. There are no qualifying households nor members."
        })}
        })
        .catch(next);
});

router.get('/grant/baby_sunshine_bonus', async (req, res, next) => {
    console.log("GET /api/grant/baby_sunshine_bonus");
    // This will return all the data, exposing only the id and action field to the client
    Household.find({})
        .then((data) => {
        let qualifying_households = []

        data.forEach(curr_household => {
            let curr_result = curr_household.evalBabySunshineGrant();
            console.log(curr_household._id);
            console.log(curr_result);
            if (curr_result) {
                qualifying_households.push(curr_result)
            }
        });

        if (qualifying_households) {
            res.json(qualifying_households)
        } else {
            res.json({
            "code" : 200,
            "message" : "Success. There are no qualifying households nor members."
        })}
        })
        .catch(next);
});

router.get('/grant/yolo_gst_grant', async (req, res, next) => {
    console.log("GET /api/grant/yolo_gst_grant");
    // This will return all the data, exposing only the id and action field to the client
    Household.find({})
        .then((data) => {
        let qualifying_households = []

        data.forEach(curr_household => {
            let curr_result = curr_household.evalYOLOGSTGrant();
            console.log(curr_household._id);
            console.log(curr_result);
            if (curr_result) {
                qualifying_households.push(curr_result)
            }
        });

        if (qualifying_households) {
            res.json(qualifying_households)
        } else {
            res.json({
            "code" : 200,
            "message" : "Success. There are no qualifying households nor members."
        })}
        })
        .catch(next);
});

// End of Grant APIs

module.exports = router;