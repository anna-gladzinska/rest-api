const express = require('express');
const randomID = require('@anngladz/randomid-generator');

const app = express();

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

const db = [{
        id: 1,
        author: 'John Doe',
        text: 'This company is worth every coin!'
    },
    {
        id: 2,
        author: 'Amanda Doe',
        text: 'They really know how to make you happy.'
    },
];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    if (req.params.id === "random") {
        res.json(db[Math.floor(Math.random() * db.length)]);
    } else {
        res.json(db.filter(item => item.id == req.params.id));
    }
});

app.post('/testimonials', (req, res) => {
    const {
        author,
        text
    } = req.body;
    const id = randomID(2);

    const newTestimonial = {
        id: id,
        author: author,
        text: text
    }

    db.push(newTestimonial);
    res.json({
        message: 'ok'
    });
});

app.put('/testimonials/:id', (req, res) => {
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

    const item = db.find(item => item.id == req.params.id);
    const index = db.indexOf(item);

    db[index] = changeTestimonial;

    res.json({
        message: 'ok'
    });
});

app.delete('/testimonials/:id', (req, res) => {
    const item = db.find(item => item.id == req.params.id);
    const index = db.indexOf(item);

    db.splice(index, 1)
    res.json({
        message: 'ok'
    });
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});