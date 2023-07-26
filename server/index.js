const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')
const adminRoute = require('./routes/admin.js')
const userRoute = require('./routes/user.js')
const { authenticate, secretKey }  = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin', adminRoute);
app.use('/users', userRoute);

// MongoDB Connection
async function connectDB() {
  try {
    const uri = 'mongodb+srv://sohailatwork10:sohail@cluster0.bnxf07q.mongodb.net/?retryWrites=true&w=majority';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected');
  } catch (err) {
    console.log('Error connecting to DB: ' + err);
  }
}

connectDB();

app.get('/profile', authenticate, (req, res) => {
  res.json({
    "username": req.user.username,
    "role": req.user.role
  })
})


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
