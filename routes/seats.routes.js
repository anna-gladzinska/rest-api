const express = require('express');
const router = express.Router();
const db = require('./../db');
const randomID = require('@anngladz/randomid-generator');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const {
        day,
        seat,
        client,
        email
    } = req.body;
    const id = randomID(4);

    const newSeat = {
        id: id,
        day: day,
        seat: seat,
        client: client,
        email: email
    }

    if (
        db.seats.some(seat => seat.day == newSeat.day && seat.seat == newSeat.seat)
    ) {
        res.json({
            message: "The slot is already taken..."
        });
    } else {
        db.seats.push(newSeat);
        res.json({
            message: 'OK'
        });
    }
});

router.route('/seats/:id').put((req, res) => {
    const {
        id,
        day,
        seat,
        client,
        email
    } = req.body;

    const changeSeat = {
        id: req.params.id,
        seat: seat,
        client: client,
        email: email
    }

    const item = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(item);

    db.seats[index] = changeSeat;

    res.json({
        message: 'ok'
    });
});

router.route('/seats/:id').delete((req, res) => {
    const item = db.seats.find(item => item.id == req.params.id);
    const index = db.seats.indexOf(item);

    db.seats.splice(index, 1)
    res.json({
        message: 'ok'
    });
});

module.exports = router;