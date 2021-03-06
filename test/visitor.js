//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
describe('/GET book', () => {
    it('it should GET all the visitor of a museum', (done) => {
      chai.request(server)
          .get('/api/visitors?date=1404198000000&museum=chinese_american_museum')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
               Object.keys(res.body).length.should.not.equal(0);
                //res.body.length.should.be.eql(0);
            done();
          });
    });
});