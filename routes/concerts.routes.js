const express = require('express');
const router = express.Router();
const db = require('./../db');
const randomID = require('@anngladz/randomid-generator');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const {
        performer,
        genre,
        price,
        day,
        image
    } = req.body;
    const id = randomID(4);

    const newConcert = {
        id: id,
        performer: performer,
        genre: genre,
        price: price,
        day: day,
        image: image
    }

    db.concerts.push(newConcert);
    res.json({
        message: 'ok'
    });
});

router.route('/concerts/:id').delete((req, res) => {
    const item = db.concerts.find(item => item.id == req.params.id);
    const index = db.concerts.indexOf(item);

    db.concerts.splice(index, 1)
    res.json({
        message: 'ok'
    });
});

module.exports = router;