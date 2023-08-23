const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')

const adminRoute = require('./routes/admin.js')
const userRoute = require('./routes/user.js')
const connectDB = require('./db/conn.js')
const { authenticate, secretKey } = require('./middleware/auth');

const app = express();
// app.use(cors({
//   origin: 'https://e-kaksha.vercel.app/'
// }));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.use('/admin', adminRoute);
app.use('/users', userRoute);

app.get('/', (req, res) => {
  res.send('Hello');
})

app.get('/profile', authenticate, (req, res) => {
  console.log('inside profile')
  console.log(req.user.username);
  console.log(req.user.role);
  res.json({
    "username": req.user.username,
    "role": req.user.role
  })
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
  