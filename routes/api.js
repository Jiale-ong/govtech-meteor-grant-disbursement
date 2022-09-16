const express = require('express');
const router = express.Router();

const mongoose = require("mongoose")
const Household = require("../models/household")

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
router.get('/household', (req, res, next) => {
    console.log("GET /api/household");
    // This will return all the data, exposing only the id and action field to the client
    Household.find({}, 'household_type')
        .then((data) => res.json(data))
        .catch(next);
});

router.post('/household', (req, res, next) => {
    if (req.body.household_type) {
        Household.create(req.body)
            .then((data) => res.json(data))
            .catch(next);
    } else {
        res.json({
            error: 'Missing required field household_type',
        });
    }
});

router.delete('/household/:id', (req, res, next) => {
    Household.findOneAndDelete({ _id: req.params.id })
        .then((data) => res.json(data))
        .catch(next);
});
// End of Household APIs

// Family Member APIs
router.post('/family_member', (req, res, next) => {
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

    const selected_household = Household.findOne({_id: body.household_id});
    selected_household.family_members
});


module.exports = router;