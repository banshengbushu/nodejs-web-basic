const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
require('should');

describe('CategoryController', ()=> {
  it('GET /categories should return all categories', ()=> {
    request
      .get('/category')
      .expect(200)
      .expect((res)=> {
        res.body.totalCount.should.equal(2);
      })
      .end(done);
  });

  it('GET /categories/:categoryId should return one category', ()=> {
    request
      .get('categories/588386e7807d6197b013db17')
      .expect(200)
      .expect((res)=> {
        res.body.should.equal({
          "name": "vegetables"
        },)
          .end(done);
      });
  });


  it('POST /categories should return 201', ()=> {
    const category = {
      "name": "fruit"
    };

    request
      .post('categories')
      .send(category)
      .expect(201)
      .end(done);
  });

  it('DELETE /categories/:categoryId should return 204', ()=> {
    request
      .delete('/categories/588386e7807d6197b013db17')
      .expect(204)
      .end(done);
  });

  it('PUT /categories/:categoryId should return 204', ()=> {
    const category = {
      "name": "fruit"
    };
    request
      .put('/categories/58838a2faed8733e1ff7288d')
      .send(category)
      .expect(204)
      .end(done);
  })
});