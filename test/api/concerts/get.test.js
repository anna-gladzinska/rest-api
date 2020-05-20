const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

    before(async () => {
        const testConOne = new Concert({
            _id: '5eb7e0380f9f751b9499a13b',
            performer: 'Lorem Ipsum',
            genre: 'Folk',
            price: 15,
            day: 4,
            image: '/img/uploads/fr.jpg'
        });
        await testConOne.save();

        const testConTwo = new Concert({
            _id: '5eb7e0380f9f751b9499a13c',
            performer: 'Ipsum Lore',
            genre: 'Soul',
            price: 20,
            day: 4,
            image: '/img/uploads/s.jpg'
        });
        await testConTwo.save();
    });

    it('performer/:performer should return one concerts by performer ', async () => {
        const res = await request(server).get('/api/concerts/performer/Lorem Ipsum');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('genre/:genre should return one concerts by genre ', async () => {
        const res = await request(server).get('/api/concerts/genre/Folk');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(1);
    });

    it('price/:price_min/:price_max should return concerts by price ', async () => {
        const res = await request(server).get('/api/concerts/price/15/20');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('day/:day should return concerts by day ', async () => {
        const res = await request(server).get('/api/concerts/day/4');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });


    after(async () => {
        await Concert.deleteMany({
            performer: {
                $in: ['Lorem Ipsum', 'Ipsum Lore']
            }
        });
    });
});