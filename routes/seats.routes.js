const express = require('express');
const router = express.Router();
const db = require('./../db');
const randomID = require('@anngladz/randomid-generator');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats[db.seats.findIndex(item => item.id == req.params.id)]);
});

router.route('/seats').post((req, res) => {
    if (
        db.seats.some(seat => seat.day == req.body.day && seat.seat == req.body.seat)
    ) {
        res.json({
            message: "The slot is already taken..."
        });
    } else {
        db.seats.push({
            id: randomID(4),
            day: req.body.day,
            seat: req.body.seat,
            client: req.body.client,
            email: req.body.email
        })

        res.json({
            message: 'OK'
        });

        req.io.emit('seatsUpdated', db.seats); 
    }
});

router.route('/seats/:id').put((req, res) => {
    db.seats[db.seats.findIndex(item => item.id == req.params.id)] = {
        id: req.params.id,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email
    }

    res.json({
        message: 'ok'
    });
});

router.route('/seats/:id').delete((req, res) => {
    db.seats.splice(db.seats.findIndex(item => item.id == req.params.id), 1)
    res.json({
        message: 'ok'
    });
});

module.exports = router;