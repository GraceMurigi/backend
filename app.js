// MongoDB PassWORD: G8cDRBmi75aa2MgB
// MongoDB Connection: mongodb+srv://grace:G8cDRBmi75aa2MgB@cluster0-9h4kg.mongodb.net/test?retryWrites=true&w=majority

// express app
const express = require('express');
const bodyParser = require('body-parser'); 
// for MongoDB
const mongoose = require('mongoose'); 
// for our monggose models
// const Thing = require('./models/thing') 
// register router 
const stuffRoutes = require('./routes/stuff'); 


const app = express();

mongoose.connect('mongodb+srv://grace:G8cDRBmi75aa2MgB@cluster0-9h4kg.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
	console.log('successfully connceted to MongoDB Atlas');
})
.catch((error) => {
	console.log('Unable to connect to MongoDB Atlas!');
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); 

app.use('/api/stuff', stuffRoutes); 

// app.use((req, res, next) => {
//   console.log('Request received!');
//   next();
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Your request was successful!' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Response sent successfully!');
// });

module.exports = app;