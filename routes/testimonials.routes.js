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
    res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
    const {
        author,
        text
    } = req.body;
    const id = randomID(4);

    const newTestimonial = {
        id: id,
        author: author,
        text: text
    }

    db.testimonials.push(newTestimonial);
    res.json({
        message: 'ok'
    });
});

router.route('/testimonials/:id').put((req, res) => {
    const {
        id,
        author,
        text
    } = req.body;

    const changeTestimonial = {
        id: req.params.id,
        author: author,
        text: text
    }

    const item = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(item);

    db.testimonials[index] = changeTestimonial;

    res.json({
        message: 'ok'
    });
});

router.route('/testimonials/:id').delete((req, res) => {
    const item = db.testimonials.find(item => item.id == req.params.id);
    const index = db.testimonials.indexOf(item);

    db.testimonials.splice(index, 1)
    res.json({
        message: 'ok'
    });
});

module.exports = router;