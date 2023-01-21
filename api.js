const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const  Db = require('./dboperations');

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());

//GET Requests
app.get('/Test', (req, res) => {
  console.log('GET Request Received')
  Db.getTable('Orders').then((data) => {
    res.send(data[0]);
  })
  console.log('GET Response Sent')
});

//POST Requests
app.post('/Test', function(req, res) {
  console.log('POST Request Received')
  let data = {...req.body}
  Db.addOrder(data)
  res.end();
  console.log('POST Response Sent')
});

//Listen
app.listen(3001, function(){
  console.log('server is running on port 3001');
})