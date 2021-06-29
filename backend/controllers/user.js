const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {

    //params
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;

    if (email == null || username == null || password == null) {
        return res.status(400).json({ 'error' : 'missing parameters'});
    }

    //todo verify pseudo lenght, mail regex, password, etc

    User.findOne({
        attributes: ['email'],
        where: { email: email }
    })
    .then(function(userFound) {
        if (!userFound) {
            bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                var newUser = User.create({
                    email: email,
                    username: username,
                    password: bcryptedPassword,
                    bio: bio,
                    isAdmin: 0  
                })  
                .then(function(newUser) {
                    return res.status(201).json({
                        'userId': newUser.id
                    })
                })  
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'cannot add user'});
                })
            })
        }
        else {
            return res.status(400).json({ 'error': 'user already exist' });
        }
    })
    .catch(function(err) {
        return res.status(500).json({ 'error': 'unable to verify user'});
    })
}

exports.login = (req, res, next) => {
    
}