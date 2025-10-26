const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
}
);
app.get('/health', (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});