const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('ItemController', ()=> {
  it('GET /items should return all items', (done)=> {
    request
      .get('/items')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });

  it('GET /items/:itemId should return one item', (done)=> {
    const itemId = '5887855b084b4b0761a2c7ab';
    request
      .get(`/items/${itemId}`)
      .expect(200)
      .expect((res)=> {
        res.body.should.eql({
          __v: 0,
          _id: "5887855b084b4b0761a2c7ab",
          name: "orange",
          price: "3元",
          category: {
            __v: 0,
            _id: "58838a2faed8733e1ff7288d",
            name: "fruit"
          }
        })
      })
      .end(done);
  });

  it('POST /items should return 201', (done)=> {
    const item = {
      "name": "apple",
      "price": "3元",
      "category": "58838a2faed8733e1ff7288d"
    };

    request
      .post('/items')
      .send(item)
      .expect(201)
      .end(done);
  });

  it('PUT /items/:itemId should return 204', (done)=> {
    const itemId = '58878c3e3d1e7c156964cd23';
    const item = {
      "name": "apple",
      "price": "5元",
      "category": "58838a2faed8733e1ff7288d"
    };
    request
      .put(`/items/${itemId}`)
      .send(item)
      .expect(204)
      .end(done)
  });

  it('DELETE /items/:itemId should return 204', (done)=> {
    const itemId = '58878544084b4b0761a2c7aa';
    request
      .delete(`/items/${itemId}`)
      .expect(204)
      .end(done);
  });
});