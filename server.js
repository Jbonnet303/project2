// console.log('Hello');
const express = require('express');
const app = express();

app.get('/', (request, response) => {
  response.send('this works');
});


app.listen(3000, () => {
  console.log('listening...');
});
