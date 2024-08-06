const JWT = require('jsonwebtoken');
const config = require('../other/config');
const { check } = require('express-validator');

const checkToken = function (req, res, next) {
    const token = req.headers("Authorization"),split = ('')[1];

    if (token){
        JWT.verify(split, config.SECRET_KEY, async(err, id) => {
            if (err) {
                return res.status(403).json({ "status" : 403 ,"err": err });
            } else {
                next();
            }
        });
    }else {
        res.status(401).json({ "status" :401});
    }
};
module.exports = checkToken;