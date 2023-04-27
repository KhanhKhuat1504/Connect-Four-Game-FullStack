const express = require('express');
const app = express();
const parser = require('body-parser');
const cors = require('cors');

//Middleware
app.use(cors());
app.use(parser.json())

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./routes/api/create_router.js');

MongoClient.connect('mongodb+srv://ltk30:Khanh150404@cluster.uryqbfs.mongodb.net/test')
  .then((client) => {
    const db = client.db('ConnectFour');
    const gamesCollection = db.collection('ConnectFour');
    const gamesRouter = createRouter(gamesCollection);
    app.use('/ConnectFour', gamesRouter);
  })
  .catch(console.err);

app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});