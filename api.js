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
  Db.getTable('test').then((data) => {
    res.send(data[0]);
  })
  console.log('GET Response Sent')
});

//POST Requests

// SO the thing is I need to figure out how to get the new table creation data into a form that will work to create the table strucrhe correctly.

app.post('/Create', (req, res) => {
  console.log('POST REQUEST FOR NEW TABLE RECEIVED')

  Db.createTable(req.body).then((data) => {
    res.end()
  })
  console.log('POST REQUEST FOR NEW TABLE FINISHED')

})

//Listen
app.listen(3001, function(){
  console.log('server is running on port 3001');
})