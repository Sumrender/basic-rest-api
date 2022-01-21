require('dotenv').config()   // to use .env file, like in line 9 process.env.DATABASE_URL

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log("Connected to DB"));

app.use(express.json());

const subscriberRouter = require('./routes/subscribers');
app.use('/subscribers', subscriberRouter);



app.get('/', (req, res) => {
  res.write("root route");
  res.send();
})


app.listen(3000, () => {
  console.log("server listening on port 3000");
});