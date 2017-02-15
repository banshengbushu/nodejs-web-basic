const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('ItemController', ()=> {
  it('GET /items should return all items', ()=> {
    request
      .get('/items')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });

  it('GET /items/:itemId should return one item', ()=> {
    request
      .get('items/58878544084b4b0761a2c7aa')
      .expect(200)
      .expect((res)=> {
        res.body.should.equal({
          "_id": "58878544084b4b0761a2c7aa",
          "name": "tomato",
          "price": "3.5元",
          "category": {
            "_id": "588386e7807d6197b013db17",
            "name": "vegetables"
          }
        })
      })
      .end(done);
  });

  it('POST /items should return 201', ()=> {
    const item = {
      "name": "apple",
      "price": "3元",
      "category": "58838a2faed8733e1ff7288d"
    };

    request
      .post('items')
      .send(item)
      .expect(201)
      .end(done);
  });

  it('DELETE /items/:itemId should return 204', ()=> {
    request
      .delete('/items/58878c3e3d1e7c156964cd23')
      .expect(204)
      .end(done);
  });

  it('PUT /items/:itemId should return 204', ()=> {
    const item = {
      "name": "apple",
      "price": "5元",
      "category": "58838a2faed8733e1ff7288d"
    };
    request
      .put('/items/58878c3e3d1e7c156964cd23')
      .send(item)
      .expect(204)
      .end(done);
  })
});