// console.log('Hello');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.send('this works');
});


app.listen(PORT, () => {
  console.log('listening...');
});
