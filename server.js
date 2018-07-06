// console.log('Hello');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';

app.get('/', (request, response) => {
  response.send('this works');
});


app.listen(PORT, () => {
  console.log('listening...');
});


mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.on('open', () => {
  console.log('connected to mongoose!!!!!!!');
})
