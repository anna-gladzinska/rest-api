const express = require('express');
const router = express.Router();
const db = require('./../db');
const randomID = require('@anngladz/randomid-generator');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts[db.concerts.findIndex(item => item.id == req.params.id)]);
});

router.route('/concerts').post((req, res) => {
    db.concerts.push({
        id: randomID(4),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image
    })
    res.json({
        message: 'ok'
    });
});

router.route('/concerts/:id').put((req, res) => {
    db.concerts[db.concerts.findIndex(item => item.id == req.params.id)] = {
        id: req.params.id,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image
    }

    res.json({
        message: 'ok'
    });
});

router.route('/concerts/:id').delete((req, res) => {
    db.concerts.splice(db.concerts.findIndex(item => item.id == req.params.id), 1)
    res.json({
        message: 'ok'
    });
});

module.exports = router;