module.exports = {
  Item: [
    {
      "_id": "58878544084b4b0761a2c7aa",
      "name": "tomato",
      "price": "3.5元",
      "category": "588386e7807d6197b013db17"
    },
    {
      "_id": "5887855b084b4b0761a2c7ab",
      "name": "orange",
      "price": "3元",
      "category": "58838a2faed8733e1ff7288d"
    },
    {
      "_id": "58878c3e3d1e7c156964cd23",
      "name": "apple",
      "price": "3元",
      "category": "58838a2faed8733e1ff7288d"
    }
  ],
  Category: [
    {
      "_id": "588386e7807d6197b013db17",
      "name": "vegetables"
    },
    {
      "_id": "58838a2faed8733e1ff7288d",
      "name": "fruit"
    }
  ],
  Cart: [{
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
  }
  ]
};