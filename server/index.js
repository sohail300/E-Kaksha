const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser = require('body-parser')

const adminRoute = require('./routes/admin.js')
const userRoute = require('./routes/user.js')
const connectDB = require('./db/conn.js')
const { authenticate, secretKey }  = require('./middleware/auth');

const app = express();
// app.use(cors({
//   origin: 'https://e-kaksha.vercel.app/'
// }));
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/admin', adminRoute);
app.use('/users', userRoute);

connectDB();

app.get('/', (req,res) => {
  res.send('Hi');
})

app.post('/admin/signup', async (req, res) => {
  try {

      const { username, password } = req.body;
      // res.send('username: '+user)

      if (!username || !password) {
          return res.status(401).send('Invalid Credentails')
      }
      const user = await User.findOne({ username });

      if (user) {
          return res.status(403).send('User already present');
      } else {
          const obj = {
              "username": username,
              "password": password
          }

          const newUser = new User(obj);
          await newUser.save();
          console.log('User created');

          const token = jwt.sign({ username, role: "user" }, secretKey, { expiresIn: '1h' })

          return res.status(201).json(token);
      }
  } catch (err) {
      return res.status(500).send({ 'Internal Error': err });
  }
});

app.get('/profile', authenticate, (req, res) => {
  res.json({
    "username": req.user.username,
    "role": req.user.role
  })
})


// app.listen(3000, () => {
//   console.log('Server is listening on port 3000');
// });
