const Seat = require('../models/seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find());
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.getById = async (req, res) => {
    try {
        const se = await Seat.findById(req.params.id);
        if (!se) res.status(404).json({
            message: 'Not found'
        });
        else res.json(se);
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.post = async (req, res) => {
    try {
        const day = sanitize(req.body.day);
        const seat = sanitize(req.body.seat);
        const client = sanitize(req.body.client);
        const email = sanitize(req.body.email);
        
        const newSeat = new Seat({
            day: day,
            seat: seat,
            client: client,
            email: email
        });
        await newSeat.save();
        res.json({
            message: 'OK'
        });
        req.io.emit('seatsUpdated', await Seat.find());

    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.put = async (req, res) => {
    const {
        day,
        seat,
        client,
        email,
    } = req.body;

    try {
        const se = await (Seat.findById(req.params.id));
        if (se) {
            se.day = day;
            se.seat = seat;
            se.client = client;
            se.email = email;
            await se.save();
            res.json({
                message: 'OK'
            });
        } else res.status(404).json({
            message: 'Not found...'
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const se = await (Seat.findById(req.params.id));
        if (se) {
            await Seat.deleteOne({
                _id: req.params.id
            });
            res.json({
                message: 'OK'
            });
        } else res.status(404).json({
            message: 'Not found...'
        });
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
};