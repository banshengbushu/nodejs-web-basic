const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('CategoryController', ()=> {
  it('GET /categories should return all categories', (done)=> {
    request
      .get('/categories')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(2);
      })
      .end(done);
  });

  it('GET /categories/:categoryId should return one category', (done)=> {
    const categoryId = '588386e7807d6197b013db17';
    request
      .get(`/categories/${categoryId}`)
      .expect(200)
      .expect((res)=> {
        res.body.should.eql({
          "_id": "588386e7807d6197b013db17",
          "name": "vegetables"
        })
      })
      .end(done);
  });


  it('POST /categories should return 201', (done)=> {
    const category = {
      "name": "fruit"
    };

    request
      .post('/categories')
      .send(category)
      .expect(201)
      .end(done);
  });

  it('PUT /categories/:categoryId should return 204', (done)=> {
    const category = {
      "name": "fruit"
    };
    const categoryId = '58838a2faed8733e1ff7288d';
    request
      .put(`/categories/${categoryId}`)
      .send(category)
      .expect(204)
      .end(done);
  });

  it('DELETE /categories/:categoryId should return 204', (done)=> {
    const categoryId = '588386e7807d6197b013db17';
    request
      .delete(`/categories/${categoryId}`)
      .expect(204)
      .end(done);
  });
});
