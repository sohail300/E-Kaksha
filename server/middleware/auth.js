const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_KEY;

async function authenticate(req, res, next) {
    // console.log(req.body);
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).send(err);
            }
            req.user = user;
            // console.log(req.user)
            next();
        });
    } else {
        return res.status(401).send('Unauthorised');
    }
}

module.exports = {authenticate, secretKey}