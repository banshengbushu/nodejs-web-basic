const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('CartController', ()=> {
  it('GET /carts should return all carts', (done)=> {
    request
      .get('/carts')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(1);
      })
      .end(done);
  });

  it('GET /carts/:cartId should return one cart', (done)=> {
    const cartId = '5885853fa0c60678c411be5d';
    request
      .get(`/carts/${cartId}`)
      .expect(200)
      .expect((res)=> {
        res.body.should.eql({
            _id: '5885853fa0c60678c411be5d',
            userId: '1',
            items: [{
              _id: '58878544084b4b0761a2c7aa',
              item: '58878c3e3d1e7c156964cd23',
              count: 1
            },
              {
                _id: '5887855b084b4b0761a2c7ab',
                item: '58878544084b4b0761a2c7aa',
                count: 2
              },
              {
                _id: '58878c3e3d1e7c156964cd23',
                item: '5887855b084b4b0761a2c7ab',
                count: 2
              }]
          }
        )
      })
      .end(done);
  });

  it('POST /carts should return 201', (done)=> {
    const cart = {
      "userId": 1,
      "items": [
        {
          "_id": "58878544084b4b0761a2c7aa",
          "item": "58878c3e3d1e7c156964cd23",
          "count": 2
        },
        {
          "_id": "5887855b084b4b0761a2c7ab",
          "item": "58878544084b4b0761a2c7aa",
          "count": 2
        },
        {
          "_id": "58878c3e3d1e7c156964cd23",
          "item": "5887855b084b4b0761a2c7ab",
          "count": 2
        }
      ]
    };

    request
      .post('/carts')
      .send(cart)
      .expect(201)
      .end(done);
  });

  it('PUT /carts/:cartId should return 204', (done)=> {
    const cart = {
      "_id": "5885853fa0c60678c411be5d",
      "userId": 1,
      "items": [
        {
          "_id": "58878544084b4b0761a2c7aa",
          "item": "58878c3e3d1e7c156964cd23",
          "count": 1
        },
        {
          "_id": "5887855b084b4b0761a2c7ab",
          "item": "58878544084b4b0761a2c7aa",
          "count": 2
        },
        {
          "_id": "58878c3e3d1e7c156964cd23",
          "item": "5887855b084b4b0761a2c7ab",
          "count": 2
        }
      ]
    };
    const cartId = '5885853fa0c60678c411be5d';
    request
      .put(`/carts/${cartId}`)
      .send(cart)
      .expect(204)
      .end(done);
  });


  it('DELETE /carts/:cartId should return 204', (done)=> {
    const cartId = '5885853fa0c60678c411be5d';
    request
      .delete(`/carts/${cartId}`)
      .expect(204)
      .end(done);
  });

});