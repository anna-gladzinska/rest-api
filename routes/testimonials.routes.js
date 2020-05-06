const express = require('express');
const router = express.Router();
const db = require('./../db');
const randomID = require('@anngladz/randomid-generator');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
    res.json(db.testimonials[db.testimonials.findIndex(item => item.id == req.params.id)]);
});

router.route('/testimonials').post((req, res) => {
    db.testimonials.push({
        id: randomID(4),
        author: req.body.author,
        text: req.body.text,
    })

    res.json({
        message: 'ok'
    });
});

router.route('/testimonials/:id').put((req, res) => {
    db.testimonials[db.testimonials.findIndex(item => item.id == req.params.id)] = {
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
    }

    res.json({
        message: 'ok'
    });
});

router.route('/testimonials/:id').delete((req, res) => {
    db.testimonials.splice(db.testimonials.findIndex(item => item.id == req.params.id), 1)
    res.json({
        message: 'ok'
    });
});

module.exports = router;